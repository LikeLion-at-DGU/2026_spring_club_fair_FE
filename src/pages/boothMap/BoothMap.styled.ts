import styled from 'styled-components';

/**
 * 레이아웃
 */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
height: calc(var(--vh, 1vh) * 100);
`;

export const PageContent = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%; /* 부모 Wrapper가 flex:1 일 때 꽉 차게 */
  overflow-y: auto; /* 전체 스크롤 감지 */
`;

export const StickySearchArea = styled.div`
  position: sticky;
  top: 0;
  z-index: 90;
  background-color: white;
`;

export const FixedHeaderSection = styled.div`
  position: sticky;
  top: 103.5px; /* SearchBar 높이만큼 띄움 */
  z-index: 100;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

/**
 * 검색
 */
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


/**
 * 위치탭
 */
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

/**
 * 지도
 */
export const MapContainer = styled.div<{ $scale: number }>`
  flex-shrink: 0;
  width: 100%;
  height: ${(props) => 500 * props.$scale}px; 
  transition: height 0.5s ease-out;
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
    transition: transform 0.1s ease-out;
    width: 100%;
  }
`;

/**
 * 카테고리탭
 */
export const CategorySection = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: center;
  white-space: nowrap;
  position: relative;

  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

/**
 * 카드 리스트
 */

export const CardSection = styled.div<{ $isEmpty: boolean }>`
  /* flex: 1; 이나 overflow-y: auto; 를 제거합니다. */
  /* 페이지 전체 스크롤에 따라 내용이 늘어나야 하므로 높이 제한을 풉니다. */
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  padding: 0 0 100px 0;
  //overflow-y: scroll;
  flex: 1;

  min-height: 30vh;
`;

/**
 * empty state
 */
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