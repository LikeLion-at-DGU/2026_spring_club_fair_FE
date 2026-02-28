import Header from "@/components/Entity/Header";
import { type CSSProperties } from "react";
import styled from "styled-components";
import { flexCenter, flexEnd } from "@/styles/mixins";
import vegetables from "@assets/icons/vegetables.svg";
import { useQuiz } from "@/hooks/useQuiz";
import useVh from "@/hooks/useCalcVh";

const QuizPage = () => {
    const {
        isLoading,
        error,
        questions,
        currentQuestion,
        progressNumber,
        totalQuestions,
        progressPercentage,
        handleChoiceClick,
        handleBack
    } = useQuiz();

    useVh();

    if (isLoading) return <div>Loading questions...</div>;
    if (error) return <div>Error loading questions: {error.message}</div>;
    if (questions.length === 0) return <div>No questions available.</div>;

    return (
        <>
            <Header title={`${progressNumber}번`} onBack={handleBack} />
            <MainWrapper>
                <Progress id="progress">
                    <div style={{ gap: "10px", display: "flex", alignItems: "center" }}>
                        <p style={ProgressFont.inProgress}>{progressNumber}</p>
                        <p>/</p>
                        <p style={ProgressFont.final}>{totalQuestions}</p>
                    </div>
                    <ProgressBar>
                        <ProgressFill $width={progressPercentage} />
                    </ProgressBar>
                </Progress>
                <QuestionBox>
                    <img src={vegetables} alt="" />
                    <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                </QuestionBox>
                <ChoiceBox>
                    {currentQuestion.options.map((option) => (
                        <ChoiceButton key={option.id} onClick={() => handleChoiceClick(option.division)}>
                            {option.answer}
                        </ChoiceButton>
                    ))}
                </ChoiceBox>
            </MainWrapper>
        </>
    );
};

export default QuizPage;

const MainWrapper = styled.div`
    ${flexEnd}
    flex-direction: column;
    width: 91.4%;
    min-height: calc(var(--vh, 1vh) * 100 - 64px); /* 헤더 높이 제외 */
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
    cursor: pointer;
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