import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "Charmander Bulbasaur PIKACHU",
    expected: ["charmander", "bulbasaur", "pikachu"],
  },
  {
    input: "pIkAcHu",
    expected: ["pikachu"],
  },
  {
    input: "DRACAUFEU FLORIZARRE TORTANK",
    expected: ["dracaufeu", "florizarre", "tortank"],
  },
  {
    input: " Salamèche ",
    expected: ["salamèche"],
  },
  {
    input: "Ronflex        Magicarpe",
    expected: ["ronflex", "magicarpe"],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "    ",
    expected: [],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
