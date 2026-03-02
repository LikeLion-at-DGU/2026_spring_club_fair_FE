import styled, { css, keyframes } from "styled-components";

// 상태 : default, more, activated
type MarkerStatus = 'default' | 'more' | 'activated';
type MarkerType = 'CLUB' | 'FOODTRUCK';

interface MarkerProps {
    $type: MarkerType;
    $status: MarkerStatus;
    $x: number;
    $y: number;
}

// 1. 애니메이션 정의: 크기가 1배에서 1.2배로 부드럽게 변함
const pulse = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
  100% { transform: translate(-50%, -50%) scale(1); }
`;

// 2. 파동 효과 애니메이션 (선택사항: 테두리가 퍼져나감)
const ring = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
`;

const BoothMarker = styled.div<MarkerProps>`
    width: 12px;
    height: 12px;
    position: absolute;
    left: ${props => props.$x}%;
    top: ${props => props.$y}%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    /* 1. default 상태 */
    border: 1px solid ${props => props.$type === 'CLUB' ? '#BCCB39' : '#FF9A64'};
    background-color: var(--whie, #FFF);
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.10);
    transition: all 0.3s ease-in-out;

    /* 2. more 상태 */
    ${props => props.$status === 'more' && css`
        border: 1px solid var(--whie, #FFF);
        background-color: ${props.$type === 'CLUB' ? '#ABBE07' : '#FFC005'};
        box-shadow: 0 0 5px 1px ${props.$type === 'CLUB' ? '#B5C340' : '#FF7327'};
        z-index: 10;
        animation: ${pulse} 2s infinite ease-in-out;
    `}

    /* 3. activated 상태 */
    ${props => props.$status === 'activated' && css`
        border: 1px solid var(--whie, #FFF);
        background-color: ${props.$type === 'CLUB' ? '#FF7474' : '#FF782F'};
        box-shadow: 0 0 5px 1px ${props.$type === 'CLUB' ? '#B5C340' : '#FF7327'};
        z-index: 20;
        animation: ${pulse} 1.2 infinite ease-in-out;

        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: inherit;
            animation: ${ring} 1.5s infinite ease-out;
            z-index: -1;
            }
    `}
`;

export default BoothMarker;