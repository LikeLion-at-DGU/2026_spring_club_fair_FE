import { useEffect, useState } from "react";
import type { Booth } from "@/types/booth";
import { toBoothCardData } from "@/utils/booth";
import BoothCard from "@/components/Entity/BoothCard";
import { mockBooths } from "../mocks/mockBooths";

const BoothListPage = () => {
    const [booths, setBooths] = useState<Booth[]>(mockBooths);

    useEffect(() => {
        fetch("/api/booths")
            .then((res) => res.json())
            .then((data: Booth[]) => {
                setBooths(data);
            });
    }, []);

    return (
        <div>
            {booths.map((booth) => (
                <BoothCard
                    key={booth.id}
                    booth={toBoothCardData(booth)}
                />
            ))}
        </div>
    );
};

export default BoothListPage;