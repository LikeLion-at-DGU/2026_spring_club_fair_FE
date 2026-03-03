import type { Booth, FoodTruckBooth } from '@/types/booth';

type BoothUnion = Booth | FoodTruckBooth;

export const mockBooths: BoothUnion[] = [
  {
    id: 1,
    name: '코딩 동아리 CODE-X',
    type: 'IT / 개발',
    division: '학술',
    dates: ['2026-03-04', '2026-03-05'],
    locNum: 1,
    location: '학생회관 앞 광장',
    shortdesc: '나만의 미니 웹페이지 제작 체험',
    description:
      'HTML과 CSS를 활용해 나만의 미니 웹페이지를 만들어보는 체험 부스입니다.',
    event: ['웹사이트 즉석 제작 체험', '코딩 퀴즈 대회'],
    recruitStart: '2026-03-01',
    recruitEnd: '2026-03-15',
    recruitDetail: '상시 모집 (신입 부원 환영 👋)',
    handle: 'codex_official',
    url: 'https://instagram.com/codex_official',
    images: [
      {
        order: 0,
        image_url:
          'https://cf-tabs-image.campuspick.com/clubrecruit/1686551931804562.jpg',
      },
      {
        order: 1,
        image_url:
          'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 2,
    name: '사진 동아리 SNAP',
    type: '예술 / 사진',
    division: '취미',
    dates: ['2026-03-04'],
    locNum: 15,
    location: '중앙 잔디밭',
    shortdesc: '무료 인생샷 촬영 이벤트',
    description: '전문 카메라로 무료 프로필 사진을 촬영해드립니다.',
    event: ['무료 인생샷 촬영', '베스트 포토 시상식'],
    recruitStart: '2026-08-20',
    recruitEnd: '2026-09-05',
    recruitDetail: '2학기 신입 모집 예정',
    handle: 'snap_club',
    url: 'https://instagram.com/snap_club',
    images: [
      {
        order: 0,
        image_url:
          'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop',
      },
      {
        order: 1,
        image_url:
          'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 3,
    name: '밴드 동아리 Resonance',
    type: '음악 / 밴드',
    division: '공연',
    dates: ['2026-03-05'],
    locNum: 51,
    location: '대강당 앞',
    shortdesc: '라이브 버스킹 및 악기 체험',
    description: '라이브 버스킹 공연과 함께 악기 체험도 진행합니다.',
    event: ['버스킹 공연', '악기 원데이 클래스'],
    recruitStart: '2026-02-15',
    recruitEnd: '2026-03-31',
    recruitDetail: '보컬 / 기타 / 드럼 모집 중',
    handle: 'resonance_band',
    url: 'https://instagram.com/resonance_band',
    images: [
      {
        order: 0,
        image_url:
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop',
      },
      {
        order: 1,
        image_url:
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 4,
    name: '환경 동아리 GreenWay',
    type: '환경 / 봉사',
    division: '봉사',
    dates: ['2026-03-05'],
    locNum: 404,
    location: '도서관 앞',
    shortdesc: '친환경 키링 만들기 체험',
    description: '재활용 플라스틱을 활용해 친환경 키링을 만들어봅니다.',
    event: ['친환경 키링 만들기', '분리수거 캠페인'],
    recruitStart: '2026-03-01',
    recruitEnd: null,
    recruitDetail: '환경에 관심 있는 누구나 환영 🌱',
    handle: 'greenway_official',
    url: 'https://instagram.com/greenway_official',
    images: [
      {
        order: 0,
        image_url:
          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
      },
      {
        order: 1,
        image_url:
          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  // ---- 임시 푸드트럭 mock 데이터 ----
  {
    id: 100,
    name: '윤셰프 푸드트럭',
    type: 'FOODTRUCK',
    division: null,
    dates: ['2026-03-04', '2026-03-05'],
    locNum: 99,
    location: '만해광장',
    description: '달콤한 츄러스와 다양한 길거리 간식을 판매하는 푸드트럭!',
    menu: [
      { name: '츄러스', price: '4000' },
      { name: '아이스크림츄러스', price: '6000' },
      { name: '회오리감자', price: '5000' },
    ],
    // images: null,
    images: [
      {
        order: 0,
        image_url:
          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
      },
      {
        order: 1,
        image_url:
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
];
