import { useEffect, useState } from 'react';
import { api } from '@/api/client';

// timetable API response 타입 정의
export interface TimetableItem {
  timetable_id: number;
  start_time: string;
  end_time: string;
  team_name: string;
  category: string;
  image_url: string | null;
}

export interface TimetableLocation {
  location_id: number;
  location_name: string;
  items: TimetableItem[];
}

export interface TimetableAPIResponse {
  day: string;
  results: TimetableLocation[];
}

export type TimetableQueryParams = Record<string, string | number | undefined>;

export const useTimetable = (params: TimetableQueryParams) => {
  const [locations, setLocations] = useState<TimetableLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      setIsLoading(true);
      try {
        const data = await api.get<TimetableAPIResponse>(
          '/api/timetable',
          params,
        );
        console.log('Timetable API response:', data); // 응답 데이터 확인용 로그
        setLocations(data.results || []);
        setError(null);
      } catch (err) {
        setLocations([]);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTimetable();
  }, [JSON.stringify(params)]);

  return { locations, isLoading, error };
};
