import React, { useState } from 'react';
import Header from '../../components/Entity/Header';
import SearchBar from '@/components/Entity/SearchBar';
import DayTab from '@/components/Entity/DayTab';
import CategoryTab from '@/components/Entity/CategoryTab';
import BoothCard from '@/components/Entity/BoothCard';
import { useNavigate } from 'react-router-dom';
import Map from '@/components/Entity/Map';
import { useCategory } from '@/hooks/useCategory';
import { getDivisionFromBooths } from '@/utils/boothUtils';
import { useBoothCards } from '@/hooks/useBoothCards';
import { useBooths } from '@/hooks/useBooths';
import { DIVISION_ID_MAP } from '@/utils/boothUtils';
import * as S from './BoothMap.styled';
import { useAllBooths } from '@/hooks/useAllBooths';

const BoothMap = () => {


  /** 주요 데이터 흐름 요약 ***************************************************************
   * 
   * 1. 검색 처리 
   *    - 사용자가 탭을 클릭하여 상태 변경
   *    - activeDay, activeLocation, activeCategory
   * 
   * 2. 필터 선택
   *    - allBooths에서 현재 장소와 날짜에 맞는 부스만 필터링하여 marker로 전달
   *    - boothByLocation
   * 
   * 3. 데이터 매칭
   *    - 필터링된 조건으로 API 호출하여 하단 카드 섹션 구성
   *    - boothCards
   * 
   * 4. 리스트 로드
   *    - 검색 결과 클릭 시 해당 부스의 day,loc,cat 상태를 강제로 동기화하고 지도의 포커스 이동
   *    - handleSearchResultClick
   * 
   **************************************************************************************/


  /**
   * 검색 시 UI 모드 관리
   */
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드 || 지도 모드 결정
  const [searchTerm, setSearchTerm] = useState(""); // 검색창에 입력한 텍스트값
  const HighlightedText = ({text, highlight}: {text: string, highlight: string}) => { // 검색어 하이라이팅
    if (!highlight.trim()) {
      return<>{text}</>
    }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="highlight">{part}</span>
        ) : (
          part
        )
      )}
    </>
    );
  };  

  /**
   * 위치 및 날짜 필터링
   * - activeDay
   * - activeLocation
   */
  const [activeDay, setActiveDay] = React.useState(1); // 현재 선택된 날짜
  const [activeLocation, setActiveLocation] = useState<'manhae' | 'paljeongdo'>( 'manhae' ); // 현재 선택된 장소
  const isPaljeongdo = activeLocation === 'paljeongdo';
  const LOCATION_ID_MAP = { manhae: 1, paljeongdo: 2,};
  
  /**
   * 카테고리 필터링
   * : 부스/푸드트럭 카테고리 탭 전환 + 분과 선택 상태 관리
   * - activeCategory (useCategory)
   */
  const {
    activeCategory,
    selectedDivision,
    handleBoothClick,
    handleDivisionClick,
    handleFoodTruckClick,
  } = useCategory();

  /**
   * useBoothCards
   * - 현재 선택된 필터(loc,day,div,q)에 맞는 카드 리스트 데이터 호출
   */
  const { boothCards, isLoading } = useBoothCards({
    location_id: LOCATION_ID_MAP[activeLocation],
    day: activeDay === 1 ? '2026-03-04' : '2026-03-05',
    division_id: selectedDivision ? DIVISION_ID_MAP[selectedDivision] : undefined,
    booth_type: activeCategory === 'FOODTRUCK' ? 'FOODTRUCK' : 'CLUB', 
    q: searchTerm,
    // locnum (marker 띄우기) ㄴㄴ
  });

  /**
   * useBooth
   * : 모든 부스 데이터 호출
   */
  const currentDayStr = activeDay === 1 ? '2026-03-04' : '2026-03-05';
  const allBooths = useBooths(currentDayStr);
  const totalBooths = useAllBooths(); // day 관계없이 검색 결과 띄울 용도

  /**
   * 분과명 추출 (카테고리화)
   */
  const divisionList = React.useMemo(() => { 
    const dataArray = (allBooths as any).results || allBooths; 
    return getDivisionFromBooths(dataArray);
  }, [allBooths]);

  /**
   * 지도 marker 표시
   * : loc, day에 일치하는 부스 데이터만 필터링하여 지도 위에 marker로 뿌리기 위해 만든 정제된 데이터 배열
   */
  const boothsByLocation = React.useMemo(() => {
    const allData = (allBooths as any).results || (Array.isArray(allBooths) ? allBooths : []);
    
    // 1. location_name 매칭용 맵
    const locationNameMap = {
      manhae: "만해광장",
      paljeongdo: "팔정도"
    };
    
    return allData
      .filter((b: any) => 
        b.location_name === locationNameMap[activeLocation] && // 장소 필터링
        b.dates.includes(currentDayStr)) // 날짜 필터링
      .map((b: any) => ({
        ...b,
        id: b.booth_id,            // Map 컴포넌트 내부에서 selectedBoothId와 비교용
        name:b.name,
        locNum: b.loc_num,         // 핵심: 좌표를 찍기 위한 키 (loc_num -> locNum)
        division: b.division_name, // 카테고리 강조용
        type: b.booth_type         // 마커 색상 결정용 (CLUB / FOODTRUCK)
      }));
  }, [allBooths, activeLocation, activeDay]);

  
/****************
 * 검색 기능 관련
 ****************/
  const [isInternalChange, setIsInternalChange] = useState(false);
  const [pendingBoothId, setPendingBoothId] = useState<number | null>(null);

  /**
   * 검색 필드 초기화
   */
  const handleClear = () => {
    setIsInternalChange(true);
    setSearchTerm("");
    setSelectedBoothId(null);
    setIsSearchMode(false);
    setSelectedBoothName(null);
  };

  /**
   * 검색 결과
   * (allBooths 전체 데이터에서 searchTerm이 포함된 부스만 필터링한 결과)
   * (totalBooths: useAllBooths에서 이미 중복 제거와 날짜 우선순위가 처리된 데이터)
   */
  const SearchResults = React.useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if (!normalizedSearchTerm) return [];

    return totalBooths.filter((b: any) => 
      b.name.toLowerCase().includes(normalizedSearchTerm)
    );
  }, [searchTerm, totalBooths]); // totalBooths를 의존성에 추가

  /**
   * 검색 결과 클릭 시
   * @param booth
   */
  const handleSearchResultClick = (booth: any) => {
    // 1. 검색어 상태 업데이트 (useBoothCards의 q 파라미터로 전달)
    setIsInternalChange(true);
    setSearchTerm(booth.name);
    setIsSearchMode(false);

    // 2. loc, day 동기화
    const locationKey = booth.location_name === "팔정도" ? 'paljeongdo' : 'manhae' ;
    const dayNum = booth.dates?.includes('2026-03-04') ? 1 : 2;
    setActiveLocation(locationKey);
    setActiveDay(dayNum);
    
    // 3. 카테고리 동기화
    if (booth.booth_type === 'FOODTRUCK') {
      handleFoodTruckClick();
    } else{
      handleBoothClick();
    }
    setSelectedBoothName(booth.name);
  }

  
  /**********************************
   * Interaction (상호작용 및 시각효과)
   **********************************/
  
  /**
   * 카드 클릭 시 강조(card,marker) 로직
   * - BoothId 기반
   */
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);
  const [selectedBoothName, setSelectedBoothName] = useState<string | null>(null);
  /*const handleCardToggle = (id: number) => {
    setSelectedBoothId((prev) => (prev === id ? null : id));
  };*/
  const handleCardToggle = (name: string) => {
  setSelectedBoothName((prev) => (prev === name ? null : name));
};

  /**
   * 지도 확대/축소 로직
   * - CardSection을 아래로 스크롤하면 지도가 축소되는 효과 관리
   * - 스크롤 양에 따라 1.0에서 0.4까지 축소
   */
  const [mapScale, setMapScale] = useState(1); // 1 (100%) ~ 0.7 (70%) 사이값
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const newScale = Math.max(0.4, 1 - scrollTop / 0.05); // 스크롤이 0~100px 움직일 때 비율이 1~0.7로 변하도록 계산
    setMapScale(newScale);
  };
  
  /**
   * isDrag 관련 상태
   * : 마우스 드래그 (카테고리 가로 탭)
   */
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const onDragStart = (e: React.MouseEvent) => {
    setIsDrag(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  const onDragEnd = () => setIsDrag(false);
  const onDragMove = (e: React.MouseEvent) => {
    if (!isDrag || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절 (2배속)
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  /**
   * 부스카드 상세이동 연결 로직
   */
  const navigate = useNavigate();
  const handleBoothCardClick = (id: number, type: string) => {
    if (type === 'FOODTRUCK') {
      navigate(`/foodtruck/${id}`);
    } else {
      navigate(`/booth/${id}`);
    }
  };

  /**
   * 강조 상태 초기화 관련
   */
  React.useEffect(() => {
  // 1. 만약 검색 클릭으로 인한 변경(isInternalChange가 true)이라면,
  //    name을 초기화하지 않고 그냥 넘어감
  if (isInternalChange) {
    setIsInternalChange(false); // 다음 번을 위해 다시 false로 돌려놓기
    return; 
  }
  // 2. 사용자가 직접 탭을 눌러서 이동했을 때만 name를 초기화
  setSelectedBoothName(null);  
}, [selectedDivision]); 
// 의존성 배열에서 activeDay, activeLocation 제거함 (스크롤 고친 후 TODO  ?*******)
// isInternalChange는 의존성 배열에 넣지 않거나, 
// 넣더라도 로직 내부에서 위와 같이 분기 처리를 해야 함
  

  // ======================== return ============================ //

  return (
      <S.PageContent onScroll={handleScroll} ref={scrollRef}>

      <S.StickySearchArea>
        <SearchBar
          value={searchTerm}
          isSearchMode={isSearchMode}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchMode(true)} 
          onClear={handleClear}       
        />
      </S.StickySearchArea>
        {isSearchMode ? (
          /* 2. 검색 모드 UI (왼쪽 화면) */
          <S.SearchResultOverlay>
            {searchTerm.trim() !== "" ? (
              <>
            <S.ResultLabel>검색 결과</S.ResultLabel>
            {SearchResults.length > 0 ? (
              SearchResults.map((result: any) => (
                <S.ItemContainer
                  key={result.booth_id} 
                  onClick={() => handleSearchResultClick(result)}
                >
                  <HighlightedText text={result.name} highlight={searchTerm} />
                </S.ItemContainer>
              ))
            ) : (
              <S.EmptyState>일치하는 검색 결과가 없습니다.</S.EmptyState>
            )}
            </>
            ) : (
              <S.EmptyState></S.EmptyState>
            )}
          </S.SearchResultOverlay>
        ) : (
          <>
          
       <S.FixedHeaderSection>
        <S.LocationTabSection>
        <button
          className={activeLocation === 'manhae' ? 'active' : ''}
          onClick={() => setActiveLocation('manhae')}
        >만해광장</button>
        <button
          className={activeLocation === 'paljeongdo' ? 'active' : ''}
          onClick={() => setActiveLocation('paljeongdo')}
        >팔정도</button>
      </S.LocationTabSection>
        <S.MapContainer $scale={mapScale}>
          <Map 
            activeLocation={activeLocation}
            //onLocationChange={setActiveLocation}
            activeDay={activeDay}
            activeBooths={boothsByLocation}
            selectedBoothId={selectedBoothId}
            selectedBoothName={selectedBoothName}
            activeDivision={selectedDivision}
            activeCategory={activeCategory as 'BOOTH' | 'FOODTRUCK'}
          />
        </S.MapContainer>

        {/* 요일탭 섹션 */}
        <DayTab activeDay={activeDay} onTabClick={(id) => setActiveDay(id)} />
        {/* 카테고리탭 섹션 */}
        <S.CategorySection
          ref={scrollRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          <CategoryTab
            text='부스'
            showArrow={true}
            isActive={activeCategory === 'BOOTH'}
            onClick={handleBoothClick}
          />
          {activeCategory === 'BOOTH' &&
            divisionList.map((div) => (
              <CategoryTab
                key={div}
                text={div}
                isActive={selectedDivision === div}
                onClick={() => handleDivisionClick(div)}
              />
            ))}
          <CategoryTab
            text='푸드트럭'
            showArrow={false}
            isActive={activeCategory === 'FOODTRUCK'}
            disabled={isPaljeongdo}
            onClick={() => {
              if (!isPaljeongdo) handleFoodTruckClick();
            }}
          />
        </S.CategorySection>
        </S.FixedHeaderSection>
      
        {/* 카드 리스트 섹션 */}
        <S.CardSection $isEmpty={boothCards.length <= 2}>
          {isLoading ? (
            <S.EmptyState>loading...</S.EmptyState>
          ) : boothCards.length > 0? (
            boothCards.map((booth) => (
              <BoothCard
                key={booth.id}
                booth={booth}
                onClick={() => handleCardToggle(booth.name)}
                isActive={selectedBoothName === booth.name}
                onDetailClick={() => handleBoothCardClick(booth.id, booth.type)}
              />
            ))
          ) : (
            <S.EmptyState>
              해당 요일에 해당하는 부스가 없습니다.
            </S.EmptyState>
          )}
        </S.CardSection>
        </>)}
      </S.PageContent>
  );
};

export default BoothMap;
