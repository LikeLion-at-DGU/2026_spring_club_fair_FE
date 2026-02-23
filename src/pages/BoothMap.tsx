import React, {use, useState} from 'react';
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
    overflow-x: auto;
    white-space: nowrap;
`

const BoothMap = () => {
  const [activeDay, setActiveDay] = React.useState(1);

  /**
   * 현재 무엇이 선택되었는지 관리하는 상태
   * 'booth': 부스 카테고리가 열림
   * 'foodtruck': 푸드트럭이 선택됨
   * 'null': 아무것도 선택되지 않거나 초기 상태
   */ 
  const [activeCategory, setActiveCategory] = useState<'booth'|'foodtruck'|null>(null);

  /* 선택된 분과 상태 */
  const [selectedDivision, setSelectedDivision] = useState<string|null>(null);

      // 가상의 분과 데이터 (실제 부스 데이터에서 추출 예정)
      const divisionList = ["공연", "사회", "연구", "예창", "학술", "체육", "봉사"]


  // 1. 부스 버튼 클릭 핸들러
  const handleBoothCick = () => {
    if (activeCategory === 'booth') {
      // a. 이미 부스이면 : 닫기 (null로 변경)
      setActiveCategory(null);
      setSelectedDivision(null);
    } else {
      // b. 그렇지 않으면 : 열기
      setActiveCategory('booth');
    }
  };

  // 2. 푸드트럭 버튼 클릭 핸들러
  const handleFoodTruckClick = () => {
    if (activeCategory === 'foodtruck') {
      // a. 이미 푸드트럭이면 : off
      setActiveCategory(null);
    } else {
      // b. 그렇지 않으면 : on
      setActiveCategory('foodtruck');
      setSelectedDivision('null');
    };
  };

  /****************** */

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
            onClick={handleBoothCick}
          />
          {/* 부스 클릭 시 노출되는 분과들 */}
          {activeCategory === 'booth' && (
            <>
              {divisionList.map((div) => (
                <CategoryTab
                  key={div}
                  text={div}
                  isActive={selectedDivision === div}
                  onClick={() => setSelectedDivision(div)}
                />
              ))}
            </>
          )}

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