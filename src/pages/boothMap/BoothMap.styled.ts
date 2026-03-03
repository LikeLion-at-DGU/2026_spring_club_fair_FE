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
  height: 100%;
  overflow-y: auto;
  /* 아이폰에서 스크롤이 더 부드럽게 작동하도록 설정 */
  -webkit-overflow-scrolling: touch;
`;

export const StickySearchArea = styled.div`
  position: sticky;
  top: 0;
  z-index: 110;
  background-color: white;
  max-width: 540px;
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
`;

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
  /* 스크롤에 따라 높이가 직접 변하면 레이아웃이 깨질 수 있으므로 scale에 비례하여 조정 */
  height: ${(props) => 400 * props.$scale}px;
  min-height: 200px; /* 너무 작아지지 않게 방지 */
  transition: height 0.1s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.grey50};
  border-top: 1px solid ${(props) => props.theme.colors.green900};
  border-bottom: 1px solid ${(props) => props.theme.colors.green900};

  @media (min-width: 540px) {
    padding: 40px 0;
    height: ${(props) =>
      500 * props.$scale}px; // PC에서는 지도를 조금 더 크게 봐도 시원합니다.
  }
  @media (max-width: 450px) {
    height: ${(props) => 350 * props.$scale}px;
  }

  & > div:first-child {
    flex-shrink: 0;
    width: 100%;
    transform: scale(${(props) => props.$scale});
    transform-origin: center center;
    transition: transform 0.1s ease-out;
    /* 하드웨어 가속 활용 */
    will-change: transform;
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
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

/**
 * 카드 리스트
 */

export const CardSection = styled.div<{ $isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  padding: 0 16px 100px 16px;
  flex: 1;
  min-height: 40vh;
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
