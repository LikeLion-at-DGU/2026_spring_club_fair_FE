import type { BoothCardData } from "@/types/booth";
import arrowRight from "@assets/icons/fi-sr-caret-right.svg";
import { flexCenter, flexStart } from "@styles/mixins";
import styled from "styled-components";


interface Props {
    booth: BoothCardData;
    width?: number;
    height?: number;
}

const BoothCardWrapper = styled(flexStart) <{ $width?: number; $height?: number }>`
    width: ${props => props.$width}%;
    height: ${props => props.$height}px;
    flex-direction: column;
    padding: var(--M, 8px);
    border-radius: var(--XL, 16px);
    border: 1px solid var(--Grey-grey-400, #BDBEBF);
    background: var(--whie, #FFF);
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.10);
    .booth-image{
        width: 95px;
        height: 126px;
        border-radius: var(--M, 8px);
        background: var(--Grey-grey-500, #ADAEAF);
    }
`;




const BoothCard = ({ booth, width = 91, height = 144 }: Props) => {
    return (
        <BoothCardWrapper $width={width} $height={height}>
            <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                <img className="booth-image" src={booth.image} alt={booth.name} />
                <div className="booth-info">
                    <p>{booth.tag}</p>
                    <h2>{booth.name}</h2>
                    <p>{booth.date}</p>
                    <p>{booth.location}</p>
                    <button>
                        자세히 보기
                        <img src={arrowRight} alt="arrow-right" />
                    </button>
                </div>
            </div>
        </BoothCardWrapper>
    );
};

export default BoothCard;