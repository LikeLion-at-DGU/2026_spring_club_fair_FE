import styled from 'styled-components';
import Header from '@/components/Entity/Header';
import BoothCard from '@/components/Entity/BoothCard';
import { useBoothCards } from '@/hooks/useBoothCards';
import { flexCenter } from '@/styles/mixins';

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

const TestResult = () => {
    const { boothCards, isLoading, error } = useBoothCards({});

    if (isLoading) return <div>결과 로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;

    return (
        <>
            <Header title="결과보기" />
            <PageContainer>
                <ResultContainer>
                    <div id='result_title'>당신과 어울리는 동아리는<br /><span style={{ color: "#798705" }}>OO</span> 분과입니다</div>
                    <div id='result_content'>
                        무대·발표처럼 사람들 앞에서 에너지를
                        주고받는 활동에 끌리는 선택이 많았어요.
                        관객과 함께 호흡하거나 팀으로
                        공연을 만들어가는 경험이 잘 맞을 타입이에요.
                    </div>
                </ResultContainer>
                <div style={{ padding: "20px", display: "grid", gap: "20px" }}>
                    {boothCards.map((booth) => (
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
