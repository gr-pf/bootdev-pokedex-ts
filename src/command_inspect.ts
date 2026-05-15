import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const [pokemon, ...otherArgs] = args;

    if (!pokemon) {
        throw new Error("you must provide a pokemon name");
    }

    if (!(pokemon in state.pokedex)) {
        throw new Error("you have not caught that pokemon");
    }

    const pokemonInfos = state.pokedex[pokemon];
    console.log(`Name: ${pokemonInfos.name}`);
    console.log(`Height: ${pokemonInfos.height}`);
    console.log(`Weight: ${pokemonInfos.weight}`);
    console.log("Stats:");
    for (const stat of pokemonInfos.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const type of pokemonInfos.types) {
        console.log(`  - ${type.type.name}`);
    }

};