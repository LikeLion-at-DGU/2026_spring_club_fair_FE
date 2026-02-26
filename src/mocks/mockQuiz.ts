import type { QuizQuestion, QuizResultResponse } from "../types/quiz";

export const mockQuizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "동아리 박람회에서 가장 먼저<br/>눈길이 가는 건?",
        order: 1,
        options: [
            { id: 1, answer: "무대에서 진행되는 공연", division: 1 },
            { id: 2, answer: "전시·창작 결과물이 보이는 부스", division: 6 },
            { id: 3, answer: "몸을 쓰거나 체험형 활동이 많은 부스", division: 7 },
            { id: 4, answer: "조용히 설명을 듣는 스터디·연구 부스", division: 5 },
        ]
    },
    {
        id: 2,
        question: "대학 생활에서 더 끌리는 건?",
        order: 2,
        options: [
            { id: 5, answer: "사람들과 특정 관심사를 깊게 나누는 모임", division: 3 },
            { id: 6, answer: "직접 도움이 필요한 곳에 가서 활동하는 경험", division: 2 },
            { id: 7, answer: "전공·진로와 연결된 활동", division: 8 },
            { id: 8, answer: "완전히 새로운 시도를 해보는 경험", division: 4 },
        ]
    },
    {
        id: 3,
        question: "내가 더 공감되는 말은?",
        order: 3,
        options: [
            { id: 9, answer: "\"무대 위에서 나를 표현하고 싶다\"", division: 1 },
            { id: 10, answer: "\"내 손으로 무언가를 만들어보고 싶다\"", division: 6 },
            { id: 11, answer: "\"체력과 팀워크를 기르고 싶다\"", division: 7 },
            { id: 12, answer: "\"깊이 있게 공부하고 탐구하고 싶다\"", division: 5 },
        ]
    },
    {
        id: 4,
        question: "동아리에서 얻고 싶은 건?",
        order: 4,
        options: [
            { id: 13, answer: "사람들과의 네트워크와 교류", division: 3 },
            { id: 14, answer: "사회에 보탬이 되는 경험", division: 2 },
            { id: 15, answer: "실질적인 실력 향상", division: 8 },
            { id: 16, answer: "색다른 경험과 실험적인 활동", division: 4 },
        ]
    },
    {
        id: 5,
        question: "활동 분위기를 고른다면?",
        order: 5,
        options: [
            { id: 17, answer: "에너지 넘치고 활발한 분위기", division: 1 },
            { id: 18, answer: "차분하고 몰입감 있는 분위기", division: 5 },
            { id: 19, answer: "협력과 팀워크가 중요한 분위기", division: 7 },
            { id: 20, answer: "따뜻하고 가치 중심적인 분위기", division: 2 },
        ]
    },
    {
        id: 6,
        question: "내가 더 끌리는 활동은?",
        order: 6,
        options: [
            { id: 21, answer: "무대·발표·관객과 만나는 활동", division: 1 },
            { id: 22, answer: "창작·전시·기획 활동", division: 6 },
            { id: 23, answer: "세미나·토론·스터디 활동", division: 8 },
            { id: 24, answer: "관심사 기반 커뮤니티 활동", division: 3 },
        ]
    }
];

export const mockQuizResult: QuizResultResponse = {
    recommended_division: {
        id: 1,
        name: "공연"
    },
    booths: [
        {
            id: 1,
            name: "코딩 동아리 CODE-X",
            type: "IT / 개발",
            division: "학술",
            dates: ["2026-03-04", "2026-03-05"],
            locNum: 1,
            location: "학생회관 앞 광장",
            image: "https://cf-tabs-image.campuspick.com/clubrecruit/1686551931804562.jpg"
        },
        {
            id: 3,
            name: "밴드 동아리 Resonance",
            type: "음악 / 밴드",
            division: "공연",
            dates: ["2026-03-05"],
            locNum: 51,
            location: "대강당 앞",
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop"
        }
    ]
};
