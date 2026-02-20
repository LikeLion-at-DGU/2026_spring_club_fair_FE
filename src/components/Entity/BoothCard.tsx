import type { BoothCardData } from "@/types/booth";
import arrowRight from "@assets/icons/fi-sr-caret-right.svg";

interface Props {
    booth: BoothCardData;
}

const BoothCard = ({ booth }: Props) => {
    return (
        <div className="booth-card">
            <img src={booth.image} alt={booth.name} />
            <div>
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
    );
};

export default BoothCard;