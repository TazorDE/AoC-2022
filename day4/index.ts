/**
 * Copyright 2022 - Malte Teichert
 * Advent of Code Day 3
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("./input.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);
const assignments: Number[][] = [];
let containedCount = 0;
let overlapCount = 0;

lines.forEach((line) => {
  assignments.push(extractNumbers(line));
});

assignments.forEach((assignment) => {
  if (checkFullyContained(assignment)) {
    containedCount++;
  }
  if (checkOverlap(assignment)) {
    overlapCount++;
  }
});

function extractNumbers(str: string) {
  // Use the split() method to split the string on the "," and "-" characters.
  const parts = str.split(/[,-]/);

  // Use the map() method to convert the parts from strings to numbers, and return the array of numbers.
  return parts.map((part: any) => Number(part));
}

function checkFullyContained(numbers: Number[]) {
  // check if number[0] is less than number[2] and number[1] is greater than number[3] or the reverse is true
  let checkFirst: boolean =
    numbers[0] <= numbers[2] && numbers[1] >= numbers[3];
  let checkSecond: boolean =
    numbers[2] <= numbers[0] && numbers[3] >= numbers[1];
  if (checkFirst || checkSecond) return true;
  return false;
}

function checkOverlap(numbers: Number[]) {
  // if number0 is larger or equal than number 2 and less or equal than 3
  // or number1 is larger or equal than number 2 and less or equal than 3
  // and the inverse for the other pair
  let overlap1: boolean = numbers[0] >= numbers[2] && numbers[0] <= numbers[3];
  let overlap2: boolean = numbers[1] >= numbers[2] && numbers[1] <= numbers[3];
  let overlap3: boolean = numbers[2] >= numbers[0] && numbers[2] <= numbers[1];
  let overlap4: boolean = numbers[3] >= numbers[0] && numbers[3] <= numbers[1];

  if (overlap1 || overlap2 || overlap3 || overlap4) {
    return true;
  }
  return false;
}

console.log("Contained count:", containedCount);
console.log("Overlap count:", overlapCount);
