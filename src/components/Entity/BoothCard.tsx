import type { BoothCardData } from "@/types/booth";
import arrowRight from "@assets/icons/fi-sr-caret-right.svg";
import { flexStart, flexColumn, ellipsis } from "@styles/mixins";
import styled from "styled-components";

interface Props {
    booth: BoothCardData;
    width?: number;
    height?: number;
}

const BoothCardWrapper = styled.div<{ $width?: number; $height?: number }>`
    ${flexColumn}
    width: ${props => props.$width}%;
    height: ${props => props.$height}px;
    padding: var(--M, 8px);
    border-radius: var(--XL, 16px);
    border: 1px solid var(--Grey-grey-400, #BDBEBF);
    background: var(--whie, #FFF);
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.10);
    overflow: hidden;
`;

const ContentContainer = styled.div`
    ${flexStart}
    width: 100%;
    gap: 10px;
`;

const BoothImage = styled.img`
    width: 95px;
    height: 126px;
    border-radius: var(--M, 8px);
    background: var(--Grey-grey-500, #ADAEAF);
    object-fit: cover;
    flex-shrink: 0;
`;

const BoothInfo = styled.div`
    ${flexColumn}
    flex: 1;
    min-width: 0; /* Necessary for ellipsis to work in flex children */
`;

const BoothTag = styled.p`
    font-size: 12px;
    color: var(--Grey-grey-600, #8E8E8E);
    ${ellipsis}
`;

const BoothTitle = styled.p`
    color: var(--black, #121212);
    font-family: "Pyeojin Gothic";
    font-size: 18px;
    font-weight: 600;
    ${ellipsis}
`;

const BoothDate = styled.p`
    font-size: 14px;
    color: var(--Grey-grey-700, #616161);
    ${ellipsis}
`;

const DetailButton = styled.button`
    ${flexStart}
    align-items: center;
    background: none;
    border: none;
    color: var(--Primary-primary-500, #FF5C00);
    font-weight: 600;
    cursor: pointer;
    margin-top: auto;
    padding: 0;
    
    img {
        width: 16px;
        height: 16px;
    }
`;



const BoothCard = ({ booth, width = 91, height = 144 }: Props) => {
    return (
        <BoothCardWrapper $width={width} $height={height}>
            <ContentContainer>
                <BoothImage src={booth.image} alt={booth.name} />
                <BoothInfo>
                    <BoothTag>{booth.type}</BoothTag>
                    <BoothTitle>{booth.name}</BoothTitle>
                    <BoothDate>{booth.dates.join(", ")}</BoothDate>
                    <p>{booth.location}</p>
                    <DetailButton>
                        자세히 보기
                        <img src={arrowRight} alt="arrow-right" />
                    </DetailButton>
                </BoothInfo>
            </ContentContainer>
        </BoothCardWrapper>
    );
};

export default BoothCard;