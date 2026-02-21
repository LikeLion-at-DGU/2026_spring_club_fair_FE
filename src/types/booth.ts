//부스 전체 데이터
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