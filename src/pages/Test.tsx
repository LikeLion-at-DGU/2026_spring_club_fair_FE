import { useBoothCards } from "@/hooks/useBoothCards";
import BoothCard from "@/components/Entity/BoothCard";

const BoothListPage = () => {
    const { boothCards, isLoading, error } = useBoothCards({ division: "학술동아리" });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading booths: {error.message}</div>;

    return (
        <div style={{ padding: "20px", display: "grid", gap: "20px" }}>
            {boothCards.map((booth) => (
                <BoothCard
                    key={booth.id}
                    booth={booth}
                />
            ))}
        </div>
    );
};

export default BoothListPage;