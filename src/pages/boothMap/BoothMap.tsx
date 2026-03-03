import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const HighlightedText = ({
    text,
    highlight,
  }: {
    text: string;
    highlight: string;
  }) => {
    if (!highlight.trim()) return <>{text}</>;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className='highlight'>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  /**
   * 위치 및 날짜 필터링
   * - activeDay
   * - activeLocation
   */
  const [activeDay, setActiveDay] = useState(1);
  const [activeLocation, setActiveLocation] = useState<'manhae' | 'paljeongdo'>(
    'manhae',
  );
  const isPaljeongdo = activeLocation === 'paljeongdo';
  const LOCATION_ID_MAP = { manhae: 1, paljeongdo: 2 };

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
    division_id: selectedDivision
      ? DIVISION_ID_MAP[selectedDivision]
      : undefined,
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
  const divisionList = useMemo(() => {
    const dataArray = (allBooths as any).results || allBooths;
    return getDivisionFromBooths(dataArray);
  }, [allBooths]);

  /**
   * 지도 marker 표시
   * : loc, day에 일치하는 부스 데이터만 필터링하여 지도 위에 marker로 뿌리기 위해 만든 정제된 데이터 배열
   */
  const boothsByLocation = useMemo(() => {
    const allData =
      (allBooths as any).results || (Array.isArray(allBooths) ? allBooths : []);
    const locationNameMap = { manhae: '만해광장', paljeongdo: '팔정도' };
    return allData
      .filter(
        (b: any) =>
          b.location_name === locationNameMap[activeLocation] &&
          b.dates.includes(currentDayStr),
      )
      .map((b: any) => ({
        ...b,
        id: b.booth_id,
        name: b.name,
        locNum: b.loc_num,
        division: b.division_name,
        type: b.booth_type,
      }));
  }, [allBooths, activeLocation, activeDay]);

  /****************
   * 검색 기능 관련
   ****************/
  const [isInternalChange, setIsInternalChange] = useState(false);
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);
  const [selectedBoothName, setSelectedBoothName] = useState<string | null>(
    null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    setIsInternalChange(true);
    setSearchTerm('');
    setSelectedBoothId(null);
    setIsSearchMode(false);
    setSelectedBoothName(null);
  };

  const SearchResults = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if (!normalizedSearchTerm) return [];
    return totalBooths.filter((b: any) =>
      b.name.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [searchTerm, totalBooths]);

  const handleSearchResultClick = (booth: any) => {
    setIsInternalChange(true);
    setSearchTerm(booth.name);
    setIsSearchMode(false);
    const locationKey =
      booth.location_name === '팔정도' ? 'paljeongdo' : 'manhae';
    const dayNum = booth.dates?.includes('2026-03-04') ? 1 : 2;
    setActiveLocation(locationKey);
    setActiveDay(dayNum);
    if (booth.booth_type === 'FOODTRUCK') handleFoodTruckClick();
    else handleBoothClick();
    setSelectedBoothName(booth.name);
  };

  /** 아이폰 스크롤 대응 수정 로직 */
  const [mapScale, setMapScale] = useState(1);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    // Math.max(0, ...)를 사용하여 아이폰의 음수 스크롤(바운스) 시 지도가 커지는 현상 방지
    // 분모(150)를 조절하여 축소 속도(민감도) 결정
    const newScale = Math.max(0.65, 1 - Math.max(0, scrollTop) / 150);
    setMapScale(newScale);
  };

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onDragStart = (e: React.MouseEvent) => {
    setIsDrag(true);
    setStartX(e.pageX - (categoryScrollRef.current?.offsetLeft || 0));
    setScrollLeft(categoryScrollRef.current?.scrollLeft || 0);
  };
  const onDragEnd = () => setIsDrag(false);
  const onDragMove = (e: React.MouseEvent) => {
    if (!isDrag || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    categoryScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const navigate = useNavigate();
  const handleBoothCardClick = (id: number, type: string) => {
    type === 'FOODTRUCK'
      ? navigate(`/foodtruck/${id}`)
      : navigate(`/booth/${id}`);
  };

  const handleCardToggle = (name: string) => {
    setSelectedBoothName((prev) => {
      if (prev === name) return null;
      return name;
    });
  };

  useEffect(() => {
    if (isInternalChange) {
      setIsInternalChange(false);
      return;
    }
    setSelectedBoothName(null);
  }, [selectedDivision]);

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
          {searchTerm.trim() !== '' ? (
            <>
              <S.ResultLabel>검색 결과</S.ResultLabel>
              {SearchResults.length > 0 ? (
                SearchResults.map((result: any) => (
                  <S.ItemContainer
                    key={result.booth_id}
                    onClick={() => handleSearchResultClick(result)}
                  >
                    <HighlightedText
                      text={result.name}
                      highlight={searchTerm}
                    />
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
              >
                만해광장
              </button>
              <button
                className={activeLocation === 'paljeongdo' ? 'active' : ''}
                onClick={() => setActiveLocation('paljeongdo')}
              >
                팔정도
              </button>
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
            <DayTab
              activeDay={activeDay}
              onTabClick={(id) => setActiveDay(id)}
            />
            {/* 카테고리탭 섹션 */}
            <S.CategorySection
              ref={categoryScrollRef}
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
            ) : boothCards.length > 0 ? (
              boothCards.map((booth) => (
                <BoothCard
                  key={booth.id}
                  booth={booth}
                  onClick={() => handleCardToggle(booth.name)}
                  isActive={selectedBoothName === booth.name}
                  onDetailClick={() =>
                    handleBoothCardClick(booth.id, booth.type)
                  }
                />
              ))
            ) : (
              <S.EmptyState>해당 요일에 해당하는 부스가 없습니다.</S.EmptyState>
            )}
          </S.CardSection>
        </>
      )}
    </S.PageContent>
  );
};

export default BoothMap;
