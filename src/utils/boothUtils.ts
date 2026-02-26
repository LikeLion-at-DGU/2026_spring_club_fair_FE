/**
 * Booth 데이터로부터 분과 목록을 추출하는 유틸리티 함수입니다.
 */

import type { Booth } from '@/types/booth';

export const getDivisionFromBooths = (booths:any[]): string[] => {
    
    // 1. 모든 부스 데이터에서 division 값만 추출함
    // 2. Set으로 중복 제거
    // 3. Array.from으로 다시 배열화
    // 4. filter(Boolean)으로 null이나 빈 문자열 제거
    // => 전체 부스에서 유효한 분과명 데이터 추출 완료

  return Array.from(new Set(booths.map((booth) => booth.division_name)))
    .filter((division): division is string => !!division);
};