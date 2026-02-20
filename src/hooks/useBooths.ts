import { useEffect, useState } from "react";
import type { Booth } from "../types/booth";

export const useBooths = () => {
    const [booths, setBooths] = useState<Booth[]>([]);

    useEffect(() => {
        fetch("/api/booths")
            .then((res) => res.json())
            .then(setBooths);
    }, []);

    return booths;
};