//부스 상세 데이터
export interface Booth {
    id: number;
    name: string;
    type: string;
    division: string | null;
    dates: string[];
    locNum: number;
    location: string;
    shortdesc: string;
    description: string;
    event: string[];
    recruitStart: string | null;
    recruitEnd: string | null;
    recruitDetail: string | null;
    handle: string | null;
    url: string | null;
    images: string;
}

//부스 카드 데이터
export interface BoothCardData {
    id: number;
    name: string;
    type: string;
    division: string | null;
    dates: string[];
    locNum: number;
    location: string;
    image: string;
}

export interface BoothQueryParams {
    day?: string; // (선택) 조회를 원하는 날짜, 기본값: "2026-03-04"
    locNum?: number;
    division?: string;
    type?: string;
    q?: string;
}