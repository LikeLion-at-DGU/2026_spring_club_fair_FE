import { useEffect, useState } from 'react';
import { api } from '@/api/client';

interface TimetableBooth {
  booth_id: number;
  name: string;
  booth_type: string;
  division_name: string | null;
  dates: string[];
  location_name: string;
  loc_num: number;
  logo_url: string | null;
}

interface TimetableAPIResponse {
  count: number;
  results: TimetableBooth[];
}

interface TimetableQueryParams {
  day: string;
  location_id?: number;
  division_id?: number;
  booth_type?: string;
  q?: string;
}

export const useTimetable = (params: TimetableQueryParams) => {
  const [booths, setBooths] = useState<TimetableBooth[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBooths = async () => {
      setIsLoading(true);
      try {
        const data = await api.get<TimetableAPIResponse>('/api/booths', {
          ...params,
        });
        setBooths(data.results || []);

        setError(null);
      } catch (err) {
        setBooths([]);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooths();
  }, [JSON.stringify(params)]);

  return { booths, isLoading, error };
};
