import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      //navigate("/main", { replace: true }); // 뒤로가기로 스플래쉬화면 이동<< 막아둠
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머 정리
    // (TODO : 스플래쉬 화면 터치해서 바로 넘어갈 수 있게 하려면 보완 필요)
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <BR_B>BR_B - BR-B 64px</BR_B>
      <BR_R>BR_R - BR-R 16px</BR_R>
      <BR_R>나에게 맞는 동아리</BR_R>
      <SB_28>SB_28 - PyeojinGothic-Semibold 28px</SB_28>
      <SB_24>SB_24 - PyeojinGothic-Semibold 24px</SB_24>
      <SB_20>SB_20 - PyeojinGothic-Semibold 20px</SB_20>
      <SB_18>SB_18 - PyeojinGothic-Semibold 18px</SB_18>
      <SB_16>SB_16 - PyeojinGothic-Semibold 16px</SB_16>
      <R_20>R_20 - PyeojinGothic-Regular 20px</R_20>
      <R_16>R_16 - PyeojinGothic-Regular 16px</R_16>
      <R_14>R_14 - PyeojinGothic-Regular 14px</R_14>
      <R_12>R_12 - PyeojinGothic-Regular 12px</R_12>
      <R_10>R_10 - PyeojinGothic-Regular 10px</R_10>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 32px;
`;

const BR_B = styled.div`
  ${({ theme }) => theme.fonts.BR_B};
`;
const BR_R = styled.div`
  ${({ theme }) => theme.fonts.BR_R};
`;
const SB_28 = styled.div`
  ${({ theme }) => theme.fonts.SB_28};
`;
const SB_24 = styled.div`
  ${({ theme }) => theme.fonts.SB_24};
`;
const SB_20 = styled.div`
  ${({ theme }) => theme.fonts.SB_20};
`;
const SB_18 = styled.div`
  ${({ theme }) => theme.fonts.SB_18};
`;
const SB_16 = styled.div`
  ${({ theme }) => theme.fonts.SB_16};
`;
const R_20 = styled.div`
  ${({ theme }) => theme.fonts.R_20};
`;
const R_16 = styled.div`
  ${({ theme }) => theme.fonts.R_16};
`;
const R_14 = styled.div`
  ${({ theme }) => theme.fonts.R_14};
`;
const R_12 = styled.div`
  ${({ theme }) => theme.fonts.R_12};
`;
const R_10 = styled.div`
  ${({ theme }) => theme.fonts.R_10};
`;

export default Splash;
