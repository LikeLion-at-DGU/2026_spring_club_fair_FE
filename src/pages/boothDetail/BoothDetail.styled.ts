import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const BoothTag = styled.div`
  position: absolute;
  top: 13px;
  left: 16px;
  z-index: 10;

  display: flex;
  gap: 4px;
  width: fit-content;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.8);
  color: ${(props) => props.theme.colors.green700};
  border-radius: 9999px;
  ${({ theme }) => theme.fonts.SB_12};

  & img {
    width: 16px;
    height: 16px;
  }
`;

export const BoothImgCount = styled.div`
  position: absolute;
  top: 13px;
  right: 16px;
  z-index: 10;

  display: flex;

  width: fit-content;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 9999px;
  color: ${(props) => props.theme.colors.grey800};

  ${({ theme }) => theme.fonts.SB_12};
`;
export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 375px;
  overflow: hidden;
`;
export const ImageScrollContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: auto; /* 가로 스크롤 허용 */
  scroll-snap-type: x mandatory; /* 가로 방향으로 스냅(딱딱 걸림) 활성화 */
  -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤 */

  /* 스크롤바 숨기기 (깔끔하게) */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const BoothImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;

  flex-shrink: 0; /* 이미지가 찌그러지지 않고 100% 너비 유지 */
  scroll-snap-align: center;
`;
export const Gradient = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: -2px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 56.35%, #fff 100%);
`;

export const BoothInfoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;

  margin-bottom: 14px;

  margin-top: -97px;
  position: relative;
  z-index: 10;
`;
export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 91%;

  padding: 16px;
  box-sizing: border-box;

  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);

  background-color: ${(props) => props.theme.colors.grey50};
  gap: 12px;
`;

export const CardTitleText = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.SB_16};
  color: ${(props) => props.theme.colors.black};
`;

export const InfoCardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

export const CardSubTitleText = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.R_12};
  color: ${(props) => props.theme.colors.grey500};
  line-height: 155%;
`;

export const CardHereText = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.R_14};
  color: ${(props) => props.theme.colors.black};
  line-height: 155%;
  & .grey {
    color: ${(props) => props.theme.colors.grey800};
  }
`;

export const CardRecruitContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const CardRecruitGap = styled.div`
  display: flex;
  gap: 16px;
`;
export const CardBodyText = styled.div`
  display: flex;
  gap: 8px;
  ${({ theme }) => theme.fonts.R_14};
  color: ${(props) => props.theme.colors.grey900};
  line-height: 155%;

  text-decoration: none;
  color: inherit;

  &.black {
    color: ${(props) => props.theme.colors.black};
  }
  &.grey800 {
    color: ${(props) => props.theme.colors.grey800};
  }
  &.grey500 {
    color: ${(props) => props.theme.colors.grey500};
  }
  & img {
    width: 16px;
    height: 16px;
  }
`;
