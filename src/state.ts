import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";


export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(interval: number): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = getCommands();
    const api = new PokeAPI(interval);

    return {
        readline: rl,
        commands: getCommands(),
        pokeapi: api,
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {}
    };
}