import type { FoodTruckBooth } from '@/types/booth';
import { useEffect, useState } from 'react';
import { api } from '@/api/client';

interface FoodTruckDetailApi {
  booth_id: number;
  name: string;
  booth_type: 'FOODTRUCK';
  division_name: null;
  dates: string[];
  location_name: string;
  loc_num: number;
  menu: { name: string; price: string | null }[];
  description?: string;
  images?: { order: number; image_url: string }[];
}

export function useFoodTruckDetail(boothId: number | string | undefined) {
  const [data, setData] = useState<FoodTruckBooth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!boothId) return;
    setIsLoading(true);
    api
      .get<FoodTruckDetailApi>(`/api/booths/${boothId}`)
      .then((res) => {
        if (res.booth_type !== 'FOODTRUCK')
          throw new Error('FOODTRUCK 타입이 아닙니다');
        // FoodTruckBooth 타입으로 변환
        const converted: FoodTruckBooth = {
          id: res.booth_id,
          name: res.name,
          type: res.booth_type,
          division: res.division_name,
          dates: res.dates,
          locNum: res.loc_num,
          location: res.location_name,
          description: res.description ?? '',
          menu: res.menu,
          images: res.images ?? null,
        };
        setData(converted);
      })
      .catch((err) => {
        setError(err);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, [boothId]);

  return { data, isLoading, error };
}
