export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        let url: string;
        if (!pageURL) {
            url = `${PokeAPI.baseURL}/location-area/`;
        } else {
            url = pageURL;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const fullURL: string = `${PokeAPI.baseURL}/location-area/${locationName}`
        const response = await fetch(fullURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    }
}

export type ShallowLocations = {
    next: string | null;
    previous: string | null;
    results: Location[];
};

export type Location = {
    name: string;
    url: string;
};