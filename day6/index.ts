/**
 * Copyright 2022 - Malte Teichert
 * Advent of Code Day 6
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("./input.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);


let firstMarker: number = findFirstMarker(lines[0]);
let messageMarker: number = findMessageMarker(lines[0]);
if (firstMarker !== -1) {
  console.log('firstMarker:', firstMarker);
};
if (messageMarker !== -1) {
  console.log('messageMarker:', messageMarker);
};

function findFirstMarker(buffer: string | unknown[]) {
  // Loop through the buffer, starting from the fourth character
  for (let i = 3; i < buffer.length; i++) {
    // Check if the previous four characters are all different
    if (new Set(buffer.slice(i - 3, i + 1)).size === 4) {
      // Return the current index, which is the number of characters
      // from the beginning of the buffer to the end of the first marker
      return i + 1;
    }
  }
  // If no marker is found, return -1
  return -1;
}
function findMessageMarker(buffer: string | unknown[]) {
  // Loop through the buffer, starting from the 14th character
  for (let i = 13; i < buffer.length; i++) {
    // Check if the previous 14 characters are all different
    if (new Set(buffer.slice(i - 13, i + 1)).size === 14) {
      // Return the current index, which is the number of characters
      // from the beginning of the buffer to the end of the first marker
      return i + 1;
    }
  }
  // If no marker is found, return -1
  return -1;
}