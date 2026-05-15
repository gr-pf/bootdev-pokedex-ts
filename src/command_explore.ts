import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const [locationName, ...otherArgs] = args;

    if (!locationName) {
        throw new Error("you must provide a location name");
    }

    const locationsObj = await state.pokeapi.fetchLocation(locationName);
    console.log(`Exploring ${locationName}...`)

    if (locationsObj.pokemon_encounters.length !== 0) {
        console.log("Found Pokemon:")
        for (const pokemon of locationsObj.pokemon_encounters) {
            console.log(` - ${pokemon.pokemon.name}`)
        }
    } else {
        console.log("No Pokemon found...")
    }

}