import { useEffect, useState } from 'react';
import type { Booth as BoothType, FoodTruckBooth } from '../types/booth';
type BoothUnion = BoothType | FoodTruckBooth;
import { api } from '../api/client';
import { mockBooths } from '../mocks/mockBooths';

export const useBooths = (day: string = '2026-03-04') => {
  const [booths, setBooths] = useState<BoothUnion[]>([]);

  useEffect(() => {
    api
      .get<BoothUnion[]>('/api/booths', { day })
      .then(setBooths)
      .catch((err: unknown) => {
        console.warn('Failed to fetch booths, falling back to mock data:', err);
        setBooths(mockBooths);
      });
  }, [day]);

  return booths;
};
