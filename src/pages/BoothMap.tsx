import React, {useState} from 'react';
import styled from 'styled-components';
import Header from '../components/Entity/Header';
import SearchBar from '@/components/Entity/SearchBar';
import DayTab from '@/components/Entity/DayTab';
import CategoryTab from '@/components/Entity/CategoryTab';
import BoothCard from '@/components/Entity/BoothCard';
import Map from '@/components/Entity/Map';
import { useCategory } from '@/hooks/useCategory';
import { getDivisionFromBooths } from '@/utils/boothUtils';
import { useBoothCards } from '@/hooks/useBoothCards';
import { mockBooths } from '@/mocks/mockBooths';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PageContent = styled.main`
  padding: 0 0 8% 0;
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
`
const CardSection = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: scroll;
`

// ----- ui ----- //

const BoothMap = () => {
  const [activeLocation, setActiveLocation] = useState<'manhae' | 'paljeongdo'>('manhae');
  const [activeDay, setActiveDay] = React.useState(1);
  const {
    activeCategory,
    selectedDivision,
    handleBoothClick,
    handleDivisionClick,
    handleFoodTruckClick
  } = useCategory();

  // useBoothCards 호출
  const { boothCards, isLoading } = useBoothCards({
    day: activeDay === 1 ? "2026-03-04" : "2026-03-05",
    division: selectedDivision || undefined,
    type: activeCategory === 'foodtruck' ? 'foodtruck' : undefined 
  });

  // (TODO : 실제 부스 데이터에서 추출해서 연결 후 >> 분과 리스트 이상 없는지 확인)
  const divisionList = getDivisionFromBooths(mockBooths);

  return (
    <PageContainer>
      <Header title="부스 지도" /> 

      <PageContent>      
        <SearchBar/>
        <Map
          activeLocation={activeLocation}
          onLocationChange={setActiveLocation}
        />
        <DayTab
          activeDay={activeDay}
          onTabClick={(id) => setActiveDay(id)}
        />
        {/* 부스/푸드트럭 카테고리 섹션 */}
        <CategorySection>
          <CategoryTab
            text="부스"
            showArrow={true}
            isActive={activeCategory === 'booth'}
            onClick={handleBoothClick}
          />
          {activeCategory === 'booth' && divisionList.map((div) => (
                <CategoryTab
                  key={div}
                  text={div}
                  isActive={selectedDivision === div}
                  onClick={() => handleDivisionClick(div)}
                />
              ))}
          <CategoryTab 
            text="푸드트럭"
            showArrow={false}
            isActive={activeCategory === 'foodtruck'}
            onClick={handleFoodTruckClick}
          />
        </CategorySection>
        {/* 카드 리스트 섹션 */}
        <CardSection>
          {isLoading ? (
            <div>loading...</div>
          ) : (
            boothCards.map((booth) => (
              <BoothCard
                  key={booth.id}
                  booth={booth}
              />
            ))
          )}
        </CardSection>
      </PageContent>
    </PageContainer>
  );
};

export default BoothMap;