import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import type { QuizQuestion, QuizResultResponse } from "@/types/quiz";
import { mockQuizQuestions, mockQuizResult } from "@/mocks/mockQuiz";

export const useQuiz = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [divisionIds, setDivisionIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await api.get<QuizQuestion[]>("/api/quiz");
                //console.log("Quiz Questions API Response:", data);

                if (data && data.length > 0) {
                    setQuestions(data);
                } else {
                    console.warn("API returned empty quiz questions, falling back to mock data");
                    setQuestions(mockQuizQuestions);
                }
                setError(null);
            } catch (err) {
                console.warn("Failed to fetch questions, falling back to mock data:", err);
                setQuestions(mockQuizQuestions);
                setError(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleChoiceClick = async (division: number) => {
        const updatedDivisionIds = [...divisionIds, division];
        setDivisionIds(updatedDivisionIds);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // Submit final answers
            try {
                const result = await api.post<QuizResultResponse, { division_ids: number[] }>(
                    "/api/quiz/submit",
                    { division_ids: updatedDivisionIds }
                );
                //console.log(result);
                navigate("/test/result", { state: { result } });
            } catch (err) {
                console.warn("Failed to submit quiz, using mock result:", err);
                navigate("/test/result", { state: { result: mockQuizResult } });
            }
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setDivisionIds((prev) => prev.slice(0, -1));
        } else {
            navigate(-1);
        }
    };

    const currentQuestion = questions[currentIndex];
    const progressNumber = currentIndex + 1;
    const totalQuestions = questions.length;
    const progressPercentage = totalQuestions > 0 ? (progressNumber / totalQuestions) * 100 : 0;

    return {
        questions,
        currentIndex,
        divisionIds,
        isLoading,
        error,
        handleChoiceClick,
        handleBack,
        currentQuestion,
        progressNumber,
        totalQuestions,
        progressPercentage,
    };
};
