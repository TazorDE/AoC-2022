/**
 * Copyright 2022 - Malte Teichert
 * Advent of Code Day 9
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("./input.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);

