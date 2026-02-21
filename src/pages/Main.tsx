import styled from 'styled-components';

import headerWave from '@assets/images/mainHeaderImg.png';
import mainLogo from '@assets/images/mainLogo.png';
import mainFair from '@assets/images/mainFair.png';
import mainClub from '@assets/images/mainClub.png';
import { useNavigate } from 'react-router-dom';
import linkIcon from '@assets/icons/linkIcon.svg';
const Main = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderBg />
      <MainLogo>
        <img src={mainLogo} alt='main logo' />
      </MainLogo>
      <MainText>
        나에게 필요한 레시피를 클릭해
        <br />
        동아리박람회를 즐겨보자!
      </MainText>
      <PostItWrapper>
        <PostIt className='first' onClick={() => navigate('/')}>
          <img src={mainFair} alt='main fair' />
        </PostIt>
        <PostIt className='second' onClick={() => navigate('/boothmap')}>
          <img src={mainClub} alt='main club' />
        </PostIt>
      </PostItWrapper>
      <MainBtn onClick={() => navigate('/test')}>
        <LinkIcon src={linkIcon} alt='link icon' />
        나에게 맞는 동아리 찾으러 가기
      </MainBtn>
    </Wrapper>
  );
};

export default Main;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.green50};
  ${({ theme }) => theme.fonts.BR_B};
  position: relative;
`;

export const HeaderBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background-image: url(${headerWave});
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: top;
  z-index: 0;
`;
export const MainLogo = styled.div`
  display: flex;
  width: 78%;
  height: auto;
  z-index: 1;
  margin-top: 12px;
  & img {
    width: 100%;
    height: auto;
  }
`;
export const MainText = styled.div`
  margin-top: 16px;
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
  ${({ theme }) => theme.fonts.R_16};

  justify-content: center;
  color: ${(props) => props.theme.colors.black};
  line-height: 155%;
`;
export const PostItWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 340px;
  height: 360px;
  margin-left: auto;
  margin-right: auto;

  margin-top: 32px;
`;

export const PostIt = styled.div`
  display: flex;
  width: 204px;
  height: auto;
  position: absolute;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  &.first {
    top: 0;
    left: 0;
    z-index: 1;
  }
  &.second {
    width: 210px;
    top: 115px;
    left: 130px;
    z-index: 2;
  }
  & img {
    width: 100%;
    height: auto;
  }
`;

export const MainBtn = styled.button`
  margin-top: calc(var(--vh, 1vh) * 5);
  margin-bottom: 10px;
  z-index: 4;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px 16px;
  box-sizing: border-box;

  border-radius: 12px;

  border: 1px solid;
  border-color: ${(props) => props.theme.colors.green300};
  opacity: 0.7;
  background: rgba(216, 225, 141, 0.7);

  ${({ theme }) => theme.fonts.R_14};
  color: ${(props) => props.theme.colors.green700};
  letter-spacing: -0.98px;
  line-height: 124.319%;

  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const LinkIcon = styled.img`
  width: 16px;
  height: auto;
  margin-right: 10px;
`;
