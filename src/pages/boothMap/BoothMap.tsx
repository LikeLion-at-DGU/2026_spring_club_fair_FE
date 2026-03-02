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

const BoothMap = () => {

  /**
   * 검색 및 UI 모드 관리
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
   */
  // location
  const [activeLocation, setActiveLocation] = useState<'manhae' | 'paljeongdo'>( 'manhae' ); // 현재 선택된 장소
  const isPaljeongdo = activeLocation === 'paljeongdo';
  const LOCATION_ID_MAP = { manhae: 1, paljeongdo: 2,};
  // day
  const [activeDay, setActiveDay] = React.useState(1); // 현재 선택된 날짜
  // BOOTH id
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);
  
  const handleCardToggle = (id: number) => {
    setSelectedBoothId((prev) => (prev === id ? null : id));
  };

  // category 훅
  const {
    activeCategory,
    selectedDivision,
    handleBoothClick,
    handleDivisionClick,
    handleFoodTruckClick,
  } = useCategory();

  const currentDayStr = activeDay === 1 ? '2026-03-04' : '2026-03-05';
  const allBooths = useBooths(currentDayStr);

  // 부스카드 호출
  const { boothCards, isLoading } = useBoothCards({
    day: activeDay === 1 ? '2026-03-04' : '2026-03-05',
    location_id: LOCATION_ID_MAP[activeLocation],
    division_id: selectedDivision ? DIVISION_ID_MAP[selectedDivision] : undefined,
    booth_type: activeCategory === 'FOODTRUCK' ? 'FOODTRUCK' : 'CLUB', 
    q: searchTerm,
    // TODO : 아무 필터도 선택되지 않은 초기 상태일 때 FOODTRUCK과 CLUB을 모두 반환해야 한다면?
    // locnum (marker 띄우기)
  });
  // 부스 호출 (분과명 카테고리로 추출)
  const divisionList = React.useMemo(() => {
    const dataArray = (allBooths as any).results || allBooths; 
    return getDivisionFromBooths(dataArray);
  }, [allBooths]);

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
        locNum: b.loc_num,         // 핵심: 좌표를 찍기 위한 키 (loc_num -> locNum)
        division: b.division_name, // 카테고리 강조용
        type: b.booth_type         // 마커 색상 결정용 (CLUB / FOODTRUCK)
      }));
  }, [allBooths, activeLocation, activeDay]);

  // 지도 확대/축소
  const [mapScale, setMapScale] = useState(1); // 1 (100%) ~ 0.7 (70%) 사이값
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    // 스크롤이 0~100px 움직일 때 비율이 1~0.7로 변하도록 계산
    const newScale = Math.max(0.4, 1 - scrollTop / 200); 
    setMapScale(newScale);
  };

  // 검색
  const [isInternalChange, setIsInternalChange] = useState(false);

  const handleClear = () => {
    setIsInternalChange(true);
    setSearchTerm("");
    setSelectedBoothId(null);
    setIsSearchMode(false);
  };

  const SearchResults = React.useMemo(() => {
    if (!searchTerm) return [];
    const allData = (allBooths as any).results || (Array.isArray(allBooths) ? allBooths : []);
    
    return allData.filter((b: any) => 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, allBooths]);

  const handleSearchResultClick = (booth: any) => {
    // 1. 검색어 상태 업데이트 (useBoothCards의 q 파라미터로 전달)
    setIsInternalChange(true);
    setSearchTerm(booth.name);
    setIsSearchMode(false);

    // 2. 장소 동기화
    const locationKey = booth.location_name === "팔정도" ? 'paljeongdo' : 'manhae' ;
    setActiveLocation(locationKey);

    // 3. 날짜 동기화    
    if (booth.dates && booth.dates.length > 0) {
      const firstDate = booth.dates[0];
      setActiveDay(firstDate === '2026-03-04' ? 1 : 2);
    }
    
    // 4. 카테고리 동기화
    if (booth.booth_type === 'FOODTRUCK') {
      handleFoodTruckClick();
    } else{
      handleBoothClick();
    }
    setSelectedBoothId(booth.booth_id);
  }

  
  // 마우스 드래그
  const scrollRef = React.useRef<HTMLDivElement>(null);
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

  
  const navigate = useNavigate();

  const handleBoothCardClick = (id: number, type: string) => {
    if (type === 'FOODTRUCK') {
      navigate(`/foodtruck/${id}`);
    } else {
      navigate(`/booth/${id}`);
    }
  };

  React.useEffect(() => {
    // activated 해제 관련
    setSelectedBoothId(null);    
  }, [activeLocation, activeDay, selectedDivision]);
  

  return (
      <S.PageContent>
        <SearchBar
          value={searchTerm}
          isSearchMode={isSearchMode}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchMode(true)} 
          onClear={handleClear}       
        />
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
              <S.EmptyState>해당 요일에 일치하는 검색 결과가 없습니다.</S.EmptyState>
            )}
            </>
            ) : (
              <S.EmptyState></S.EmptyState>
            )}
          </S.SearchResultOverlay>
        ) : (
          <>
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
            activeDivision={selectedDivision}
            activeCategory={activeCategory as 'BOOTH' | 'FOODTRUCK'}
          />
        </S.MapContainer>
        <DayTab activeDay={activeDay} onTabClick={(id) => setActiveDay(id)} />
        {/* 부스/푸드트럭 카테고리 섹션 */}
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
        {/* 카드 리스트 섹션 */}
        <S.CardSection onScroll={handleScroll}>
          {isLoading ? (
            <S.EmptyState>loading...</S.EmptyState>
          ) : boothCards.length > 0? (
            boothCards.map((booth) => (
              <BoothCard
                key={booth.id}
                booth={booth}
                onClick={() => handleCardToggle(booth.id)}
                isActive={selectedBoothId === booth.id}
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
