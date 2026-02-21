import type { Booth, BoothCardData } from "../types/booth";

export const toBoothCardData = (booth: Booth): BoothCardData => ({
    id: booth.id,
    name: booth.name,
    type: booth.type,
    division: booth.division,
    dates: booth.dates,
    locNum: booth.locNum,
    location: booth.location,
    image: booth.images,
});