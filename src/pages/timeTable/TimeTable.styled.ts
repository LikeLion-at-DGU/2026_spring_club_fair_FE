import styled from 'styled-components';
import DefaultImg from '@assets/images/boothDefaultImg.png';
export const Wrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};

  padding: 0 0 32px 0;
  box-sizing: border-box;
`;

export const TimeTableTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 91%;

  padding: 44px 0;

  gap: 20px;
`;

export const Title = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.SB_20};
  color: ${(props) => props.theme.colors.black};
`;

interface TimeTableImgWrapperProps {
  $img?: string;
}

export const TimeTableImgWrapper = styled.div<TimeTableImgWrapperProps>`
  display: flex;
  align-items: flex-end;
  position: relative;
  padding: 16px 20px;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 343/156;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ $img }) =>
    $img
      ? `url('${$img}') center/cover no-repeat`
      : `url('${DefaultImg}') center/cover no-repeat`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
  }
`;
export const ImgTextWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const ImgText = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.SB_28};
  color: ${(props) => props.theme.colors.white};
  &.category {
    ${({ theme }) => theme.fonts.SB_16};
  }
`;
export const TimeLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 91%;
  padding: 48px 0;
  box-sizing: border-box;
`;

export const TimeLineCaution = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 60px;
  justify-content: center;
  ${({ theme }) => theme.fonts.R_14};
  color: #78716c;
`;
