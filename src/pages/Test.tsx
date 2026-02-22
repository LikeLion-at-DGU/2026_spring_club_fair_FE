import { useBoothCards } from "@/hooks/useBoothCards";
import Header from "@/components/Entity/Header";

import { useNavigate } from "react-router-dom";
import { questions } from "@/mocks/questions";
import { answers } from "@/mocks/answers";

import { useState, type CSSProperties } from "react";
import styled from "styled-components";
import { flexCenter, flexEnd } from "@/styles/mixins";
import vegetables from "@assets/icons/vegetables.svg";

const MainWrapper = styled.div`
    ${flexEnd}
    flex-direction: column;
    width: 91.4%;
    padding: 27px 0 186px 0;
    margin: 0 auto;
    gap: 47px;
`

const ChoiceButton = styled.div`
    ${flexCenter}
    width: 100%;
    padding: 16px;
    border-radius: 9999px;
    border: 1px solid #D9DADA;
    background: #F7F7F7;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.10);
    &:hover {
        background-color: ${({ theme }) => theme.colors.green200};
        border: 1px solid ${({ theme }) => theme.colors.green500};
    }
`

const Progress = styled.div`
    ${flexCenter}
    width: 100%;
    gap: 24px;
    align-self: stretch;
    flex-direction: column;
`

const ProgressFont: Record<string, CSSProperties> = {
    inProgress: {
        fontStyle: "normal",
        fontFamily: "Pyeojin Gothic",
        fontSize: "14px",
        fontWeight: "400",
        textAlign: "center",
        color: "black",
    },
    final: {
        fontStyle: "normal",
        fontFamily: "Pyeojin Gothic",
        fontSize: "14px",
        fontWeight: "400",
        textAlign: "center",
        color: "#7B7C7C",
    }
}

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.green50};
    border-radius: 9px;
    overflow: hidden;
`

const ProgressFill = styled.div<{ $width: number }>`
    width: ${({ $width }) => $width}%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.green500};
    border-radius: 9px;
    transition: width 0.3s ease-in-out;
`
//
const QuestionBox = styled.div`
    ${flexCenter}
    flex-direction: column;
    gap: 10px;
    div {
        color: #121212;
        text-align: center;
        font-family: "Pyeojin Gothic";
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
`

const ChoiceBox = styled.div`
    ${flexCenter}
    width: 100%;
    flex-direction: column;
    gap: 24px;
    margin-top: 37px;
    div {
        color: #121212;
        text-align: center;
        font-family: "Pyeojin Gothic";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`

const BoothListPage = () => {
    const [progressNumber, setProgressNumber] = useState<number>(1);
    const { boothCards, isLoading, error } = useBoothCards({ division: "학술동아리" });
    const navigate = useNavigate();

    const handleChoiceSubmit = async (choiceId: number) => {
        try {
            const response = await fetch("/api/quiz/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionNumber: progressNumber,
                    choiceId: choiceId,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit answer");
            }

            if (progressNumber < 5) {
                setProgressNumber(prev => Math.min(prev + 1, 6));
            } else {
                // 마지막 질문인 경우 결과 페이지로 이동
                navigate("/test/result");
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
            if (progressNumber < 5) {
                setProgressNumber(prev => Math.min(prev + 1, 6));
            } else {
                navigate("/test/result");
            }
        }
    };



    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading booths: {error.message}</div>;

    const currentQuestion = questions[progressNumber as keyof typeof questions];
    const currentAnswers = answers[progressNumber as keyof typeof answers];

    return (
        <>
            <Header title={`${progressNumber}번`} />
            <MainWrapper>
                <Progress id="progress">
                    <div style={{ gap: "10px", display: "flex", alignItems: "center" }}>
                        <p style={ProgressFont.inProgress}>{progressNumber}</p>
                        <p>/</p>
                        <p style={ProgressFont.final}>6</p>
                    </div>
                    <ProgressBar>
                        <ProgressFill $width={(progressNumber / 6) * 100} />
                    </ProgressBar>
                </Progress>
                <QuestionBox>
                    <img src={vegetables} alt="" />
                    <div dangerouslySetInnerHTML={{ __html: currentQuestion }} />
                </QuestionBox>
                <ChoiceBox>
                    {Object.entries(currentAnswers).map(([id, text]) => (
                        <ChoiceButton key={id} onClick={() => handleChoiceSubmit(Number(id))}>
                            {text}
                        </ChoiceButton>
                    ))}
                </ChoiceBox>
            </MainWrapper>
        </>
    );
};

export default BoothListPage;