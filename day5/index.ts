/**
 * Copyright 2022 - Malte Teichert
 * CRATE MOVER 9000
 * Advent of Code Day 3
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("C:\\Users\\Teichertm\\GitHub\\AoC-2022\\day5\\input.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);

const moveRegexMatch = /move \d+ from \d+ to \d+/;
const separateBy3Regex = /.{3}/g;
const moves: number[][] = [];
let numberOfStacks: number = 0;
let firstLineOfMoves: number = 0;
const stacks: string[][] = [];

// extract moves into a readable data format
// [amount, source, target]
lines.forEach((line, index) => {
  // if line matches the regular expression, extract the moves from it and store them in the moves array.
  if (!moveRegexMatch.test(line)) {
    return;
  }
  moves.push(extractMove(line));
  if (firstLineOfMoves == 0) {
    firstLineOfMoves = index;
  }
});

// get the number of stacks
numberOfStacks = extractHighestNumber(lines[firstLineOfMoves - 2]);

// set up stack storage
for (let i = 0; i < numberOfStacks; i++) {
  stacks.push([]);
}

// extract rows from input and build correct stacks
for (let i = 0; i < firstLineOfMoves - 2; i++) {
  const elements = [...removeFourthChar(lines[i]).matchAll(separateBy3Regex)];
  elements.forEach((entry, index) => {
    if (entry[0] !== '   ') {
      stacks[index].push(entry[0]);
    }
  });
}

// execute moves
moves.forEach(move => {
  for (let i = 0; i < move[0]; i++) {
    stacks[move[2] - 1].unshift(stacks[move[1] - 1].shift())
  }
});

let output: string = '';
stacks.forEach(stack => {
  output += stack[0];
})
output = removeBrackets(output);
console.log('Part 1 Result:', output);

// part 2

let moreStacks = [];
// set up stack storage
for (let i = 0; i < numberOfStacks; i++) {
  moreStacks.push([]);
}

// extract rows from input and build correct stacks
for (let i = 0; i < firstLineOfMoves - 2; i++) {
  const elements = [...removeFourthChar(lines[i]).matchAll(separateBy3Regex)];
  elements.forEach((entry, index) => {
    if (entry[0] !== '   ') {
      moreStacks[index].push(entry[0]);
    }
  });
}

// execute moves
moves.forEach(move => {
  let elementsToMove = moreStacks[move[1] - 1].splice(0, move[0])
  // insert elements front of new array
  moreStacks[move[2] - 1].unshift(...elementsToMove)
});

let output2: string = '';
moreStacks.forEach(stack => {
  output2 += stack[0];
})
output2 = removeBrackets(output2);
console.log('Part 2 Result:', output2);

function extractMove(move: string) {
  // Use a regular expression to match all numbers in the string
  const matches = move.match(/\d+/g);

  // Return the matches as an array of numbers
  return matches ? matches.map(Number) : [];
}

function extractHighestNumber(stacknumberingLine: string) {
  // Use a regular expression to match all numbers in the string
  const matches = stacknumberingLine.match(/\d+/g);

  // Return the highest number, or null if no numbers were found
  //@ts-ignore
  return matches ? Math.max(...matches) : 0;
}

function removeFourthChar(row: string) {
  let modifiedString: string = '';

  // Next, we loop over the string, adding each character to the `modifiedString`
  // string, except for every fourth character.
  for (let i = 0; i < row.length; i++) {
    if (i % 4 !== 3) {
      modifiedString += row[i];
    }
  }

  return modifiedString;
}

function removeBrackets(input: string) {
  // First, we create a regular expression that will match any `[` or `]` character
  // in the string.
  const regex = /[\[\]]/g;

  // Next, we use the `str.replace()` method to search for all matches in the
  // string and replace them with an empty string. This effectively removes all
  // occurrences of `[` and `]` from the string.
  const modifiedString = input.replace(regex, '');

  // Finally, we return the `modifiedString` string.
  return modifiedString;
}