/**
 * Booth 데이터로부터 분과 목록을 추출하는 유틸리티 함수입니다.
 */

import type { Booth, BoothCardData } from '@/types/booth';
import type { BoothAPIResult } from '@/types/api';

export const DIVISION_ID_MAP: Record<string, number> = {
  "공연": 1, "봉사": 2, "사회": 3, "신규": 4, 
  "연구": 5, "예창": 6, "체육": 7, "학술": 8, "기타": 9
};

export const getDivisionFromBooths = (booths:any[]): string[] => {
    
    // 1. 모든 부스 데이터에서 division 값만 추출함
    // 2. Set으로 중복 제거
    // 3. Array.from으로 다시 배열화
    // 4. filter(Boolean)으로 null이나 빈 문자열 제거
    // => 전체 부스에서 유효한 분과명 데이터 추출 완료

    return Array.from(new Set(booths.map((booth) => booth.division_name)))
        .filter((division): division is string => !!division)
        .sort((a, b) => (DIVISION_ID_MAP[a] || 99) - (DIVISION_ID_MAP[b] || 99));
};

export const mapBoothResultToBoothCardData = (result: BoothAPIResult): BoothCardData => ({
    id: result.booth_id,
    name: result.name,
    type: result.booth_type,
    division: result.division_name,
    dates: result.dates,
    locNum: result.loc_num,
    location: `${result.location_name} ${result.loc_num}번`,
    image: result.logo_url,
    hasDetail: result.has_detail,
});
