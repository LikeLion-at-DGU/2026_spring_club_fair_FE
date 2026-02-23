import styled, { css } from "styled-components";

// 상태 : default, more, activated
type MarkerStatus = 'default' | 'more' | 'activated';
type MarkerType = 'booth' | 'foodtruck';

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
    //transform: translate()(-50%, -50%);
    border-radius: 50%;
    //transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;

    /* 1. default 상태 */
    border: 1px solid ${props => props.$type === 'booth' ? '#BCCB39' : '#FF9A64'};
    background-color: var(--whie, #FFF);
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.10);

    /* 2. more 상태 */
    ${props => props.$status === 'more' && css`
        border: 1px solid var(--whie, #FFF);
        background-color: ${props.$type === 'booth' ? '#ABBE07' : '#FF782F'};
        box-shadow: 0 0 5px 1px ${props.$type === 'booth' ? '#B5C340' : '#FF7327'};
    `}

    /* 3. activated 상태 */
    ${props => props.$status === 'activated' && css`
        border: 1px solid var(--whie, #FFF);
        background-color: ${props.$type === 'booth' ? '#FF7474' : '#FFC005'};
        box-shadow: 0 0 5px 1px ${props.$type === 'booth' ? '#B5C340' : '#FF7327'};
        z-index: 20;

        &::after{
            content: '';
            width: 6px;
            height: 6px;
            background-color: white;
            border-radius: 50%;
        }
    `}
`;

export default BoothMarker;