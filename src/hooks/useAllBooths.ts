import { useMemo } from 'react';
import { useBooths } from './useBooths';

export const useAllBooths = () => {
  const day1Data = useBooths('2026-03-04');
  const day2Data = useBooths('2026-03-05');

  const allBooths = useMemo(() => {
    const d1 = (day1Data as any).results || (Array.isArray(day1Data) ? day1Data : []);
    const d2 = (day2Data as any).results || (Array.isArray(day2Data) ? day2Data : []);
    
    const uniqueMap = new Map();

    d1.forEach((booth: any) => {
      if (booth.name) {
        uniqueMap.set(booth.name, booth); // Key를 name으로 설정
      }
    });

    d2.forEach((booth: any) => {
      if (booth.name && !uniqueMap.has(booth.name)) {
        uniqueMap.set(booth.name, booth);
      }
    });

    return Array.from(uniqueMap.values());
  }, [day1Data, day2Data]);

  return allBooths;
};