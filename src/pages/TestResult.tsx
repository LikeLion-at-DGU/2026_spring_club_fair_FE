import styled from 'styled-components';
import Header from '@/components/Entity/Header';
import BoothCard from '@/components/Entity/BoothCard';
import { useBoothCards } from '@/hooks/useBoothCards';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 40px;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ResultTitle = styled.h2`
  font-family: "Pyeojin Gothic";
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 10px;
  text-align: center;
`;

const TestResult = () => {
    // 결과 페이지이므로 특정 조건에 맞는 부스들을 가져오도록 설정할 수 있습니다.
    // 여기서는 예시로 전체 부스 카드를 가져옵니다.
    const { boothCards, isLoading, error } = useBoothCards({});

    if (isLoading) return <div>결과 로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;

    return (
        <>
            <Header title="결과 보기" />
            <PageContainer>
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
