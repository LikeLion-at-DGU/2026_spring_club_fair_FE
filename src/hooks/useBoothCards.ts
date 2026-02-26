import { useEffect, useState } from "react";
import type { BoothCardData, BoothQueryParams } from "../types/booth";
import { mockQuizResult } from "../mocks/mockQuiz";
import { api } from "../api/client";

/**
 * /api/booths API를 통해 부스 카드 목록 데이터를 가져옴.
 * 
 * [BoothQueryParams]
 * day - (선택) 조회를 원하는 날짜 (기본값: "2026-03-04")
 * locNum - (선택) 장소 번호
 * division - (선택) 분과 필터
 * type - (선택) 부스 타입 필터
 * q - (선택) 검색어
 * 
 * [반환값]
 * boothCards - 부스 데이터 배열
 * isLoading - 로딩 상태
 * error - 에러 객체
 */

export const useBoothCards = (params: BoothQueryParams) => {
    const [boothCards, setBoothCards] = useState<BoothCardData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBoothCards = async () => {
            setIsLoading(true);
            try {
                // 기본값 설정 (day가 없을 경우 "2026-03-04")
                const finalParams = { day: "2026-03-04", ...params };

                const data = await api.get<BoothCardData[]>("/api/booths", finalParams as Record<string, string | number | undefined>);
                setBoothCards(data);
                setError(null);
            } catch (err) {
                console.warn("API Fetch failed, falling back to mock data:", err);

                //data 없을 시 mock data
                const fallbackData: BoothCardData[] = mockQuizResult.booths.map((booth: BoothCardData) => ({
                    id: booth.id,
                    name: booth.name,
                    type: booth.type,
                    division: booth.division,
                    dates: booth.dates,
                    locNum: booth.locNum,
                    location: booth.location,
                    image: booth.image
                }));

                setBoothCards(fallbackData);
                setError(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBoothCards();
    }, [JSON.stringify(params)]);

    return { boothCards, isLoading, error };
};
