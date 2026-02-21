import React, {useState} from 'react';
import styled from 'styled-components';
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
    align-self: stretch;
`;

const BoothMap = () => {
  const [activeDay, setActiveDay] = React.useState(1);
  const [isBoothFilterActive, setIsBoothFilterActive] = useState(false);

  return (
    <PageContainer>
      {/* 헤더 */}
      <Header title="부스 지도" /> 
      {/* 본문 */}
      <PageContent>
        <SearchBar/>
        <div style={{border: "1px solid"}}>Map</div>
        <DayTab
          activeDay={activeDay}
          onTabClick={(id) => setActiveDay(id)}
        />

        <FilterSection>
          <CategoryTab
            text="부스"
            showArrow={true}
            isActive={isBoothFilterActive}
            onClick={() => setIsBoothFilterActive(!isBoothFilterActive)}
          />
          <CategoryTab 
            text="푸드트럭"
            showArrow={false}
            isActive={isBoothFilterActive}
            onClick={() => setIsBoothFilterActive(!isBoothFilterActive)}
            />
        </FilterSection>
        <div>BoothCard List</div>
      </PageContent>
    </PageContainer>
  );
};

export default BoothMap;