import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
`;

export const PageContent = styled.main`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export const LocationTabSection = styled.div`
  height: 35px;
  display: flex;
  gap: 8px;
  padding: 0 16px;

  button {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px 8px 0 0;
    background-color: ${(props) => props.theme.colors.grey200};
    color: ${(props) => props.theme.colors.grey50};
    ${({ theme }) => theme.fonts.R_16};
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      background-color: ${(props) => props.theme.colors.green900};
      color: white;
      ${({ theme }) => theme.fonts.SB_16};
    }
  }
`;

export const MapContainer = styled.div<{ $scale: number }>`
  //flex-shrink: 0;
  width: 100%;
  height: ${(props) => 500 * props.$scale}px; 
  transition: height 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.grey50};
  border-top: 1px solid ${(props) => props.theme.colors.green900};
  border-bottom: 1px solid ${(props) => props.theme.colors.green900};

  @media (max-width: 450px) {
    height: ${(props) => 350 * props.$scale}px;
  }
  
  & > div:first-child {
    flex-shrink: 0;

    transform: scale(${(props) => props.$scale});
    transform-origin: center center; /* 탭 버튼 바로 아래에서부터 축소 시작 */
    transition: transform 0.3s ease-out;
    width: 100%;
  }
`;

export const CategorySection = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: center;
  white-space: nowrap;

  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

export const CardSection = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 40px;
  overflow-y: scroll;
  padding: 10px 0 100px;;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: ${(props) => props.theme.colors.grey600};
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
`;

 export const SearchResultOverlay = styled.div`
    flex: 1;
    background-color: ${(props) => props.theme.colors.white};
    z-index: 50;
    padding: 0 16px;
    overflow-y: auto;
  `

  export const ItemContainer = styled.div`
    padding: 16px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey100};
    ${({ theme }) => theme.fonts.R_16};
    cursor: pointer;
    
    span.highlight {
      color: ${(props) => props.theme.colors.green500};
      font-weight: bold;
    }
  `;

  export const ResultLabel = styled.div`
    padding-top: 20px;
    padding-bottom: 8px;
    color: ${(props) => props.theme.colors.grey600};
    ${({ theme }) => theme.fonts.SB_16};
  `;