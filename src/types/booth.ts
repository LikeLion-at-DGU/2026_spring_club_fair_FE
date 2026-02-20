//부스 전체 데이터
export interface Booth {
    id: number;
    name: string;
    tag: string;
    event: string;
    date: string;
    location: string;
    description: string;
    image: string;
    recruitment: string;
    url: string;
}

export interface BoothCardData {
    id: number;
    name: string;
    tag: string;
    date: string;
    location: string;
    image: string;
}