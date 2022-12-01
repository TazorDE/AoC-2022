/**
 * Copyright 2022 - Malte Teichert
 * Advent of Code Day 1
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("./input.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);

let currentElf: number = 0;
let hightstElf: number = 0;

// Challenge:
lines.forEach((line: string) => {
  // check if line is empty
  if (line == '') {
    // if line is emty start a new elf
    currentElf = 0;
    return;
  }
  // parse line as integer
  const number: number = parseInt(line);
  // calculate current elf
  currentElf += number;

  // compare current elf to high score
  if (currentElf > hightstElf) {
    hightstElf = currentElf;
  }
});

console.log('Part 1:');
console.log('most calories: ', hightstElf);

// Challenge part 2:
// store each elfs calories in an array and find the three highest calorie counts
// avoids looping over the array too many times

let elves: number[] = [];
let elfIndex = 0;
currentElf = 0;

lines.forEach((line: string) => {
  // check if line is empty
  if (line == '') {
    // if line is emty start a new elf
    currentElf = 0;
    elfIndex++;
    return;
  }
  // parse line as integer
  const number = parseInt(line);
  // calculate current elf
  currentElf += number;

  elves[elfIndex] = currentElf;
});

// find the highest calorie counts 
const first = elves.reduce((a: number, b: number) => Math.max(a, b), -Infinity);
elves.splice(elves.indexOf(first), 1);

const second = elves.reduce((a: number, b: number) => Math.max(a, b), -Infinity);
elves.splice(elves.indexOf(second), 1);

const third = elves.reduce((a: number, b: number) => Math.max(a, b), -Infinity);
elves.splice(elves.indexOf(third), 1);

// log results
console.log('Part 2:');
console.log('1.', first, '2.', second, '3.', third, 'combined:', first + second + third);