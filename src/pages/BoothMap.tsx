import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Entity/Header';
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
import { mockBooths } from '@/mocks/mockBooths';
import { DIVISION_ID_MAP } from '@/utils/boothUtils';


const PageContent = styled.main`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const LocationTabSection = styled.div`
  height: 35px;
  display: flex;
  gap: 8px;
  padding: 0 16px;

  button {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px 8px 0 0;
    background-color: ${(props) => props.theme.colors.grey200};
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.grey50};
    cursor: pointer;
    //transition: all 0.2s; /* TODO : 애니메이션 고민 */

    &.active {
      background-color: ${(props) => props.theme.colors.green900};
      color: white;
      font-weight: 600;
    }
  }
`;

const MapContainer = styled.div<{ $scale: number }>`
  //flex-shrink: 0;
  width: 100%;
  height: ${(props) => 500 * props.$scale}px; 
  transition: height 0.3s ease-out;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.grey50};
  border-top: 1px solid ${(props) => props.theme.colors.green900};
  border-bottom: 1px solid ${(props) => props.theme.colors.green900};

  & > div:first-child {
    transform: scale(${(props) => props.$scale});
    transform-origin: center center; /* 탭 버튼 바로 아래에서부터 축소 시작 */
    transition: transform 0.3s ease-out;
    width: 100%;
  }
`;

const CategorySection = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  overflow-x: auto;
  align-items: center;
  white-space: nowrap;

  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const CardSection = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 40px;
  overflow-y: scroll;
`;

// ----- ui ----- //

const BoothMap = () => {
  
  // location
  const LOCATION_ID_MAP = {
  manhae: 1,
  paljeongdo: 2,
};
  const [activeLocation, setActiveLocation] = useState<'manhae' | 'paljeongdo'>(
    'manhae',
  );

  // day
  const [activeDay, setActiveDay] = React.useState(1);
  // BOOTH id
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);
  const handleCardToggle = (id: number) => {
    setSelectedBoothId((prev) => (prev === id ? null : id));
  };

  // category
  const {
    activeCategory,
    selectedDivision,
    handleBoothClick,
    handleDivisionClick,
    handleFoodTruckClick,
  } = useCategory();

  // 부스카드 호출
  const { boothCards, isLoading } = useBoothCards({
    day: activeDay === 1 ? '2026-03-04' : '2026-03-05',
    location_id: LOCATION_ID_MAP[activeLocation],
    division_id: selectedDivision ? DIVISION_ID_MAP[selectedDivision] : undefined,
    booth_type: activeCategory === 'FOODTRUCK' ? 'FOODTRUCK' : 'CLUB', 
    // TODO : 아무 필터도 선택되지 않은 초기 상태일 때 FOODTRUCK과 CLUB을 모두 반환해야 한다면?
    // locnum (marker 띄우기)
    // q (검색)
  });
  // 부스 호출 (분과명 카테고리로 추출)
  const allBooths = useBooths();
  const divisionList = React.useMemo(() => {
    const dataArray = (allBooths as any).results || allBooths; 
    return getDivisionFromBooths(dataArray);
  }, [allBooths]);

  const boothsByLocation = React.useMemo(() => {
    const allData = (allBooths as any).results || allBooths || [];
    
    // 1. location_name 매칭용 맵
    const locationNameMap = {
      manhae: "만해광장",
      paljeongdo: "팔정도"
    };

    return allData
      .filter((b: any) => b.location_name === locationNameMap[activeLocation]) // 장소 필터링
      .map((b: any) => ({
        ...b,
        id: b.booth_id,            // Map 컴포넌트 내부에서 selectedBoothId와 비교용
        locNum: b.loc_num,         // 핵심: 좌표를 찍기 위한 키 (loc_num -> locNum)
        division: b.division_name, // 카테고리 강조용
        type: b.booth_type         // 마커 색상 결정용 (CLUB / FOODTRUCK)
      }));
  }, [allBooths, activeLocation]);

  /** 참고
   * export interface BoothCardData {
     id: number;
     name: string;
     type: string;
     division: string | null;
     dates: string[];
     locNum: number;
     location: string;
     image: string
   }
   */

  // 지도 확대/축소
  const [mapScale, setMapScale] = useState(1); // 1 (100%) ~ 0.7 (70%) 사이값

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    // 스크롤이 0~100px 움직일 때 비율이 1~0.7로 변하도록 계산
    const newScale = Math.max(0.4, 1 - scrollTop / 200); 
    setMapScale(newScale);
  };
  

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

  const handleBoothCardClick = (id: number) => {
    navigate(`/booth/${id}`);
  };

  return (
      <PageContent>
        <SearchBar />
        <LocationTabSection>
        <button
          className={activeLocation === 'manhae' ? 'active' : ''}
          onClick={() => setActiveLocation('manhae')}
        >만해광장</button>
        <button
          className={activeLocation === 'paljeongdo' ? 'active' : ''}
          onClick={() => setActiveLocation('paljeongdo')}
        >팔정도</button>
      </LocationTabSection>
        <MapContainer $scale={mapScale}>
          <Map
            activeLocation={activeLocation}
            //onLocationChange={setActiveLocation}
            activeDay={activeDay}
            activeBooths={boothsByLocation}
            selectedBoothId={selectedBoothId}
            activeDivision={selectedDivision}
          />
        </MapContainer>
        <DayTab activeDay={activeDay} onTabClick={(id) => setActiveDay(id)} />
        {/* 부스/푸드트럭 카테고리 섹션 */}
        <CategorySection
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
            onClick={handleFoodTruckClick}
          />
        </CategorySection>
        {/* 카드 리스트 섹션 */}
        <CardSection onScroll={handleScroll}>
          {isLoading ? (
            <div>loading...</div>
          ) : (
            Array.isArray(boothCards) && boothCards.map((booth) => (
              <BoothCard
                key={booth.id}
                booth={booth}
                onClick={() => handleCardToggle(booth.id)}
                isActive={selectedBoothId === booth.id}
                onDetailClick={() => handleBoothCardClick(booth.id)}
              />
            ))
          )}
        </CardSection>
      </PageContent>
  );
};

export default BoothMap;
