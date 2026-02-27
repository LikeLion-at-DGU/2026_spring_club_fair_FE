import { useEffect, useState } from 'react';
import { api } from '@/api/client';

export interface ClubBoothDetail {
  booth_id: number;
  name: string;
  booth_type: 'CLUB';
  division_name: string | null;
  dates: string[];
  location_name: string;
  loc_num: number;
  short_description: string;
  description: string;
  event: string[];
  recruit_start: string | null;
  recruit_end: string | null;
  recruit_detail: string | null;
  instagram: {
    handle: string;
    url: string;
  } | null;
  images: { order: number; image_url: string }[];
}

export function useClubBoothDetail(boothId: number | string | undefined) {
  const [data, setData] = useState<ClubBoothDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!boothId) return;
    setIsLoading(true);
    api
      .get<ClubBoothDetail>(`/api/booths/${boothId}`)
      .then((res) => {
        if (res.booth_type !== 'CLUB') throw new Error('CLUB 타입이 아닙니다');
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
