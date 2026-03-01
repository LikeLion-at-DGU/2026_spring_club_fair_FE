import styled, { css } from "styled-components";

// 상태 : default, more, activated
type MarkerStatus = 'default' | 'more' | 'activated';
type MarkerType = 'CLUB' | 'FOODTRUCK';

interface MarkerProps {
    $type: MarkerType;
    $status: MarkerStatus;
    $x: number;
    $y: number;
}

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

    /* 2. more 상태 */
    ${props => props.$status === 'more' && css`
        border: 1px solid var(--whie, #FFF);
        background-color: ${props.$type === 'CLUB' ? '#ABBE07' : '#FFC005'};
        box-shadow: 0 0 5px 1px ${props.$type === 'CLUB' ? '#B5C340' : '#FF7327'};
        z-index: 10;
    `}

    /* 3. activated 상태 */
    ${props => props.$status === 'activated' && css`
        border: 1px solid var(--whie, #FFF);
        background-color: ${props.$type === 'CLUB' ? '#FF7474' : '#FF782F'};
        box-shadow: 0 0 5px 1px ${props.$type === 'CLUB' ? '#B5C340' : '#FF7327'};
        z-index: 20;
    `}
`;

export default BoothMarker;