const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const api = {
    get: async <T>(url: string, params?: Record<string, string | number | undefined>): Promise<T> => {
        const query = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, value.toString());
                }
            });
        }

        const queryString = query.toString();
        const fullUrl = queryString ? `${BASE_URL}${url}?${queryString}` : `${BASE_URL}${url}`;

        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("API returned non-JSON response");
        }

        return response.json();
    },

    post: async <T, D>(url: string, data: D): Promise<T> => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("API returned non-JSON response");
        }

        return response.json();
    }
};
