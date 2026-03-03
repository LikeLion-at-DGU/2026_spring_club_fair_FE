import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import splashBg from '@assets/images/splashBg.png';
import splashMainLogo from '@assets/images/splashMainLogo.png';
const Splash = () => {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  const goToMain = () => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      navigate('/main', { replace: true });
    }
  };

  useEffect(() => {
    const timer = setTimeout(goToMain, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper onClick={goToMain}>
      <SplashText>나에게 맞는 동아리를 조합하다</SplashText>
      <MainLogo>
        <img src={splashMainLogo} alt='main logo' />
      </MainLogo>
      <SplashText style={{ width: '100%', justifyContent: 'center' }}>
        제42대 동아리연합회 조각 x 멋쟁이사자처럼 14기
      </SplashText>
    </Wrapper>
  );
};

export default Splash;

export const Wrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  ${({ theme }) => theme.fonts.BR_B};
  //background: radial-gradient(108.27% 50% at 50% 50%, #dee791 0%, #fff 100%);
  background-image: url(${splashBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const MainLogo = styled.div`
  display: flex;
  width: 78%;
  height: auto;
  & img {
    width: 100%;
    height: auto;
  }
`;
export const SplashText = styled.div`
  display: flex;
  width: 70%;
  justify-content: flex-start;
  ${({ theme }) => theme.fonts.BR_R};
  color: ${(props) => props.theme.colors.black};
`;
