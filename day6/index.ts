/**
 * Copyright 2022 - Malte Teichert
 * CRATE MOVER 9000
 * Advent of Code Day 6
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("./testinput.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);

