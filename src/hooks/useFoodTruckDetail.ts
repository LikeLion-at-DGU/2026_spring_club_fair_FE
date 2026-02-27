import { useEffect, useState } from 'react';
import { api } from '@/api/client';

export interface FoodTruckDetail {
  booth_id: number;
  name: string;
  booth_type: 'FOODTRUCK';
  division_name: null;
  dates: string[];
  location_name: string;
  loc_num: number;
  menu: { name: string; price: string | null }[];
  image_url: string | null;
}

export function useFoodTruckDetail(boothId: number | string | undefined) {
  const [data, setData] = useState<FoodTruckDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!boothId) return;
    setIsLoading(true);
    api
      .get<FoodTruckDetail>(`/api/booths/${boothId}`)
      .then((res) => {
        if (res.booth_type !== 'FOODTRUCK')
          throw new Error('FOODTRUCK 타입이 아닙니다');
        setData(res);
      })
      .catch((err) => {
        setError(err);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, [boothId]);

  return { data, isLoading, error };
}
