import React from 'react';
import styled from 'styled-components';
import { useCategory } from '@/hooks/useCategory';
import Header from '../components/Entity/Header';
import SearchBar from '@/components/Entity/SearchBar';
import DayTab from '@/components/Entity/DayTab';
import CategoryTab from '@/components/Entity/CategoryTab';
import BoothCard from '@/components/Entity/BoothCard';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PageContent = styled.main`
  flex: 1;
  //padding: 20px 6%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const FilterSection = styled.div`
    display: flex;
    gap: 12px;
    padding: 16px;
    overflow-x: auto;
    white-space: nowrap;
`


// ----- ui ----- //

const BoothMap = () => {
  const [activeDay, setActiveDay] = React.useState(1);
  const {
    activeCategory,
    selectedDivision,
    handleBoothClick,
    handleDivisionClick,
    handleFoodTruckClick
  } = useCategory();

  // 가상 분과명 (TODO : 실제 부스 데이터에서 추출해서 연결 예정)
  const divisionList = ["공연", "사회", "연구", "예창", "학술", "체육", "봉사"]

  return (
    <PageContainer>
      {/* 헤더 */}
      <Header title="부스 지도" /> 
      {/* 본문 */}
      <PageContent>
        <SearchBar/>
        <div style={{border: "1px solid"}}>Map</div>
        {/* Map 영역 */}
        <DayTab
          activeDay={activeDay}
          onTabClick={(id) => setActiveDay(id)}
        />

        <FilterSection>
          {/* 부스 탭 */}
          <CategoryTab
            text="부스"
            showArrow={true}
            isActive={activeCategory === 'booth'}
            onClick={handleBoothClick}
          />
          {/* 부스 클릭 시 노출되는 분과들 */}
          {activeCategory === 'booth' && divisionList.map((div) => (
                <CategoryTab
                  key={div}
                  text={div}
                  isActive={selectedDivision === div}
                  onClick={() => handleDivisionClick(div)}
                />
              ))}

          {/* 푸드트럭 탭 */}
          <CategoryTab 
            text="푸드트럭"
            showArrow={false}
            isActive={activeCategory === 'foodtruck'}
            onClick={handleFoodTruckClick}
          />
        </FilterSection>

        {/* 부스카드 리스트 영역 */}
        <div>BoothCard List</div>
      </PageContent>
    </PageContainer>
  );
};

export default BoothMap;