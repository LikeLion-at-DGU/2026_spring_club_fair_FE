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

const CategorySection = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  overflow-x: auto;
  white-space: nowrap;
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
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);

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

  // (TODO : 실제 부스 데이터에서 추출해서 연결 후 >> 분과 리스트 이상 없는지 확인)
  

  const navigate = useNavigate();

  const handleBoothCardClick = (id: number) => {
    navigate(`/booth/${id}`);
  };

  return (
      <PageContent>
        <SearchBar />
        <Map
          activeLocation={activeLocation}
          onLocationChange={setActiveLocation}
          activeDay={activeDay}
          activeBooths={boothCards} // TODO : 실제 데이터 입력 후 확인 필요
          selectedBoothId={selectedBoothId}
          activeDivision={selectedDivision}
        />
        <DayTab activeDay={activeDay} onTabClick={(id) => setActiveDay(id)} />
        {/* 부스/푸드트럭 카테고리 섹션 */}
        <CategorySection>
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
        <CardSection>
          {isLoading ? (
            <div>loading...</div>
          ) : (
            Array.isArray(boothCards) && boothCards.map((booth) => (
              <BoothCard
                key={booth.id}
                booth={booth}
                onClick={() => setSelectedBoothId(booth.id)}
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
