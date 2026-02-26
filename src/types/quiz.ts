import type { BoothCardData } from "./booth";

export interface QuizOption {
    id: number;
    answer: string;
    division: number;
}

export interface QuizQuestion {
    id: number;
    question: string;
    order: number;
    options: QuizOption[];
}

export interface QuizSubmission {
    division_ids: number[];
}

export interface RecommendedDivision {
    id: number;
    name: string;
}

export interface QuizResultResponse {
    recommended_division: RecommendedDivision;
    booths: BoothCardData[];
}
