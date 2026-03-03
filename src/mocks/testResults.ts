export interface TestResult {
    division: string;
    description: string;
    color?: string;
}

export const testResults: Record<number, TestResult> = {
    1: {
        division: "공연",
        description: "무대·발표처럼 사람들 앞에서 에너지를<br/>주고받는 활동에 끌리는 선택이 많았어요.<br/>관객과 함께 호흡하거나 팀으로<br/>공연을 만들어가는 경험이 잘 맞을 타입이에요.",
        color: "#E67979",
    },
    2: {
        division: "봉사",
        description: "가치 중심의 선택이 많았고,<br/>실제로 밖으로 나가 활동하는 경험에 관심이 드러났어요.<br/>‘함께 움직여서 도움을 만든다’는<br/>목표가동아리 활동 동기가 되는 편이에요.",
        color: "#E29ED4",
    },
    3: {
        division: "사회",
        description: "관심사 기반 커뮤니티나 교류 중심 선택이 눈에 띄었어요.<br/>특정 주제를 매개로 사람을 만나고,<br/>활동의 폭을 넓히는 방식이 잘 맞아요.",
        color: "#F1C947",
    },
    4: {
        division: "신규",
        description: "새로운 시도에 끌리는 선택이 많았어요.<br/>신규 분과는 동연에 새롭게 등록된 동아리들이<br/>일정 기간 소속되는 분과로,<br/>활동 분야는 공연·체육·학술 등 다양하게 구성되어 있습니다.",
        color: "#9D9E9F",
    },
    5: {
        division: "연구",
        description: "깊이 있는 탐구나 전공·진로와<br/>연결된 활동을 고른 비중이 높았어요.<br/>자료를 파고들고, 문제를 분석하며<br/>실력을 쌓는 방식에서 만족감이 큰 타입이에요.",
        color: "#D99E7D",
    },
    6: {
        division: "예창",
        description: "전시·창작처럼 결과물을<br/>직접 만들고 표현하는 선택이 두드러졌어요.<br/>기획부터 제작까지 ‘내 손으로 완성하는<br/>과정’에서 재미를 느끼는 편이에요.",
        color: "#C7D359",
    },
    7: {
        division: "체육",
        description: "활발한 분위기, 팀워크,<br/>몸을 쓰는 체험에 끌리는 답변이 많았어요.<br/>함께 움직이며 스트레스를 풀고,<br/>꾸준히 활동하면서 친해지는 방식이 잘 맞아요.",
        color: "#81C1D9",
    },
    8: {
        division: "학술",
        description: "세미나·토론·스터디처럼<br/>‘함께 배우는 구조’에 끌리는 선택이 많았어요.<br/>부담 없이 꾸준히 공부하고,<br/>관심 주제로 이야기 나누며 성장하는 흐름이 잘 맞아요.",
        color: "#A07F6D",
    },
    9: {
        division: "기타",
        description: "여러 부스들을 돌아다니면서<br/>원하는 동아리를 찾아보세요!",
    },
};