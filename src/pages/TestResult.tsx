import styled from 'styled-components';
import Header from '@/components/Entity/Header';
import BoothCard from '@/components/Entity/BoothCard';
import { flexCenter } from '@/styles/mixins';
import { useLocation } from 'react-router-dom';
import type { QuizResultResponse } from '@/types/quiz';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ResultContainer = styled.div`
  ${flexCenter}
  width: 67.2%;
  margin: 0 auto;
  padding-top: 32px;
  flex-direction: column;
  text-align: center;
  gap: 32px;
  #result_title {
    font-family: "Pyeojin Gothic";
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: ${({ theme }) => theme.colors.black};
  }
  #result_content {
    width: 100%;
    font-family: "Pyeojin Gothic";
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme }) => theme.colors.black};
  }
`;

import { testResults } from '@/mocks/testResults';

const TestResult = () => {
  const location = useLocation();
  const result = location.state?.result as QuizResultResponse;

  if (!result) {
    return (
      <>
        <Header title="결과보기" />
        <PageContainer>
          <ResultContainer>
            <div id='result_title'>결과가 없습니다.</div>
            <div id='result_content'>퀴즈를 먼저 진행해주세요.</div>
          </ResultContainer>
        </PageContainer>
      </>
    );
  }

  const divisionDetail = testResults[result.recommended_division.id] || testResults[9];
  const titleColor = divisionDetail?.color || "#798705";

  return (
    <>
      <Header title="결과보기" />
      <PageContainer>
        <ResultContainer>
          <div id='result_title'>당신과 어울리는 동아리는<br /><span style={{ color: titleColor }}>{result.recommended_division.name}</span> 분과입니다</div>
          <div id='result_content' dangerouslySetInnerHTML={{ __html: divisionDetail?.description || "추천된 분과와 관련된 동아리 목록입니다." }} />
        </ResultContainer>
        <div style={{ padding: "20px", display: "grid", gap: "20px" }}>
          {result.booths.map((booth) => (
            <BoothCard
              key={booth.id}
              booth={booth}
            />
          ))}
        </div>
      </PageContainer>
    </>
  );
};

export default TestResult;
