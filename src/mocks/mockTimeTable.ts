// 1. API 명세서 기반 타입 정의
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

export interface TimetableResponse {
  day: string;
  results: TimetableLocation[];
}

// 📅 DAY 1 (2026-03-04) : 올려주신 사진 데이터 완벽 반영!
export const mockDay1Timetable: TimetableResponse = {
  day: '2026-03-04',
  results: [
    {
      location_id: 1,
      location_name: '만해광장',
      items: [
        {
          timetable_id: 1,
          start_time: '13:00',
          end_time: '13:30',
          team_name: 'AJAX',
          category: '힙합',
          image_url: null, // 이미지가 없으면 null
        },
        {
          timetable_id: 2,
          start_time: '13:30',
          end_time: '14:00',
          team_name: '목멱성',
          category: '밴드',
          image_url:
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop',
        },
        {
          timetable_id: 3,
          start_time: '14:00',
          end_time: '14:30',
          team_name: '음샘',
          category: '밴드',
          image_url: null,
        },
        {
          timetable_id: 4,
          start_time: '14:30',
          end_time: '15:00',
          team_name: 'ODC',
          category: '댄스',
          image_url: null,
        },
        {
          timetable_id: 5,
          start_time: '15:00',
          end_time: '15:30',
          team_name: '아리랑',
          category: '밴드',
          image_url: null,
        },
        {
          timetable_id: 6,
          start_time: '15:30',
          end_time: '16:00',
          team_name: '백상응원단',
          category: '치어리딩',
          image_url: null,
        },
        {
          timetable_id: 7,
          start_time: '16:00',
          end_time: '16:30',
          team_name: '렛츠무드',
          category: '밴드',
          image_url: null,
        },
        {
          timetable_id: 8,
          start_time: '16:30',
          end_time: '17:00',
          team_name: '피어리스던',
          category: '밴드',
          image_url: null,
        },
        {
          timetable_id: 9,
          start_time: '17:00',
          end_time: '17:30',
          team_name: '뭉게구름',
          category: '밴드',
          image_url: null,
        },
        {
          timetable_id: 10,
          start_time: '17:30',
          end_time: '18:00',
          team_name: '두둠칫',
          category: '댄스',
          image_url: null,
        },
      ],
    },
  ],
};

// 📅 DAY 2 (2026-03-05) : 테스트를 위한 예시 데이터
export const mockDay2Timetable: TimetableResponse = {
  day: '2026-03-05',
  results: [
    {
      location_id: 2,
      location_name: '팔정도',
      items: [
        {
          timetable_id: 11,
          start_time: '13:00',
          end_time: '14:00',
          team_name: '어쿠스틱로망',
          category: '어쿠스틱',
          image_url:
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
        },
        {
          timetable_id: 12,
          start_time: '14:00',
          end_time: '15:00',
          team_name: '마술동아리 일루전',
          category: '마술',
          image_url: null,
        },
        {
          timetable_id: 13,
          start_time: '15:00',
          end_time: '16:00',
          team_name: '외부게스트',
          category: '초청공연',
          image_url:
            'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop',
        },
      ],
    },
  ],
};
