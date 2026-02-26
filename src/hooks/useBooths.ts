import { useEffect, useState } from "react";
import type { Booth } from "../types/booth";
import { api } from "../api/client";
import { mockBooths } from "../mocks/mockBooths";

export const useBooths = (day: string = "2026-03-04") => {
    const [booths, setBooths] = useState<Booth[]>([]);

    useEffect(() => {
        api.get<Booth[]>("/api/booths", { day })
            .then(setBooths)
            .catch((err: unknown) => {
                console.warn("Failed to fetch booths, falling back to mock data:", err);
                setBooths(mockBooths);
            });
    }, []);

    return booths;
};