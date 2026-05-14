import type { State } from "./state.js";

export function commandHelp(state: State): void {
    console.log(`Welcome to the Pokedex!
Usages:
`);

    for (const command in state.commands) {
        console.log(`${state.commands[command].name}: ${state.commands[command].description}`)
    }

};