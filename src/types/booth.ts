// 푸드트럭 상세 데이터 (추가)
export interface FoodTruckBooth {
  id: number;
  name: string;
  type: 'FOODTRUCK';
  division: null;
  dates: string[];
  locNum: number;
  location: string;
  description: string;
  menu: { name: string; price: string | null }[];
  images?:
    | {
        order: number;
        image_url: string;
      }[]
    | null;
}
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
  images: {
    order: number;
    image_url: string;
  }[];
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
  hasDetail: boolean;
}

export interface BoothQueryParams {
  day?: string; // (선택) 조회를 원하는 날짜, 기본값: "2026-03-04"
  locNum?: number;
  division?: string;
  type?: string;
  q?: string;
}
