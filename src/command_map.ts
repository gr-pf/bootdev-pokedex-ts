import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    let url: string | undefined;
    if (state.nextLocationsURL) {
        url = state.nextLocationsURL;
    }
    const locationsObj = await state.pokeapi.fetchLocations(url);
    state.nextLocationsURL = locationsObj.next;
    state.prevLocationsURL = locationsObj.previous;
    for (const location of locationsObj.results) {
        console.log(location.name)
    }

}

export async function commandMapb(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page");
    }
    const locationsObj = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locationsObj.next;
    state.prevLocationsURL = locationsObj.previous;
    for (const location of locationsObj.results) {
        console.log(location.name)
    }

}