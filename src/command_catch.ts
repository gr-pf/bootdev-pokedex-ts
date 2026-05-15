import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const [pokemon, ...otherArgs] = args;

    if (!pokemon) {
        throw new Error("you must provide a pokemon name");
    }

    console.log(`Throwing a Pokeball at ${pokemon}...`);

    const pokemonObj = await state.pokeapi.fetchPokemon(pokemon);
    const rng = Math.random();
    let step: number;
    switch (true) {
        case pokemonObj.base_experience < 100:
            step = 0.1
            break;
        case pokemonObj.base_experience < 200:
            step = 0.2
            break;
        case pokemonObj.base_experience < 300:
            step = 0.3
            break;
        case pokemonObj.base_experience < 400:
            step = 0.4
            break;
        default:
            step = 0.5
            break;
    }


    if (rng > step) {
        console.log(`${pokemon} was caught!`);
        state.pokedex[pokemon] = pokemonObj;
    } else {
        console.log(`${pokemon} escaped!`);
    }
}