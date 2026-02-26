import { useState } from "react";

export type CategoryType = 'BOOTH' | 'FOODTRUCK' | null;

export const useCategory = () => {
    /**
     * 현재 무엇이 선택되었는지 관리하는 상태
     * 'booth': 부스 카테고리가 열림
     * 'foodtruck': 푸드트럭이 선택됨
     * 'null': 아무것도 선택되지 않거나 초기 상태
     */ 
    const [activeCategory, setActiveCategory] = useState<'BOOTH'|'FOODTRUCK'|null>(null);

    /* 선택된 분과 상태 */
    const [selectedDivision, setSelectedDivision] = useState<string|null>(null);

    
    // 1. 부스 버튼 클릭 핸들러
    const handleBoothClick = () => {
        if (activeCategory === 'BOOTH') {
        // a. 이미 부스이면 : 닫기 (null로 변경)
        setActiveCategory(null);
        setSelectedDivision(null);
        } else {
        // b. 그렇지 않으면 : 열기
        setActiveCategory('BOOTH');
        }
    };

    // 2. 푸드트럭 버튼 클릭 핸들러
    const handleFoodTruckClick = () => {
        if (activeCategory === 'FOODTRUCK') {
        // a. 이미 푸드트럭이면 : off
        setActiveCategory(null);
        } else {
        // b. 그렇지 않으면 : on
        setActiveCategory('FOODTRUCK');
        setSelectedDivision('null');
        };
    };

    // 3. 분과 버튼 클릭 핸들러
    const handleDivisionClick = (division: string) => {
        setSelectedDivision((prev) => (prev === division ? null : division));
    };

    return {
        activeCategory,
        selectedDivision,
        handleBoothClick,
        handleDivisionClick,
        handleFoodTruckClick
    };
};
