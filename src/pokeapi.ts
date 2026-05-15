import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor(interval: number) {
        this.#cache = new Cache(interval);
    }

    closeCache() {
        this.#cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        let url: string;
        if (!pageURL) {
            url = `${PokeAPI.baseURL}/location-area/`;
        } else {
            url = pageURL;
        }

        const cachedVal = this.#cache.get<ShallowLocations>(url);
        if (cachedVal) {
            return cachedVal;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        this.#cache.add(url, result);
        return result;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const fullURL: string = `${PokeAPI.baseURL}/location-area/${locationName}`

        const cachedVal = this.#cache.get<Location>(fullURL);
        if (cachedVal) {
            return cachedVal;
        }

        const response = await fetch(fullURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        this.#cache.add(fullURL, result);
        return result;
    }
}

export type ShallowLocations = {
    next: string | null;
    previous: string | null;
    results: Location[];
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};