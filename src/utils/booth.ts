import type { Booth, BoothCardData } from "../types/booth";

export const toBoothCardData = (booth: Booth): BoothCardData => ({
    id: booth.id,
    name: booth.name,
    tag: booth.tag,
    date: booth.date,
    location: booth.location,
    image: booth.image,
});