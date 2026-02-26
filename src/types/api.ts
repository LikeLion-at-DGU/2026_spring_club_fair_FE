export interface BoothAPIResult {
    booth_id: number;
    name: string;
    booth_type: string;
    division_name: string | null;
    dates: string[];
    location_name: string;
    loc_num: number;
    logo_url: string;
}
