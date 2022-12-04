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

const rucksacks: string[][] = [];

let score = 0;
let score2 = 0;

lines.forEach((items) => {
  rucksacks.push(splitStringInHalf(items));
});

rucksacks.forEach((rucksack) => {
  let commonChar = findCommonChar(rucksack[0], rucksack[1]);
  score += getScore(commonChar);
});

findCommonCharInArray(lines);

// Define a function that takes a string as input, and returns an array containing the two halves of the string.
function splitStringInHalf(str: string): string[] {
  // Divide the length of the string by 2 to get the length of each half.
  const halfLength = str.length / 2;

  // Use the slice() method to extract the first half of the string.
  const firstHalf = str.slice(0, halfLength);

  // Use the slice() method to extract the second half of the string.
  const secondHalf = str.slice(halfLength);

  // Return an array containing the two halves of the string.
  return [firstHalf, secondHalf];
}

// Define a function that takes two strings as input, and returns the character that is common to both strings.
function findCommonChar(str1: string, str2: string): string {
  // Create an array containing all of the characters in the first string.
  const chars1 = str1.split("");

  // Create an array containing all of the characters in the second string.
  const chars2 = str2.split("");

  // Use the filter() method to create an array containing only the characters that
  // appear in both strings.
  const commonChars = chars1.filter((char: any) => chars2.includes(char));

  // Return the first character in the commonChars array (or null if the array is
  // empty).
  return commonChars[0];
}

// Define a function that takes a character as input, and returns its score (a number from 1 to 52).
function getScore(char: string): number {
  // Define a string containing all of the uppercase and lowercase letters in the
  // alphabet.
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Use the indexOf() method to get the position of the character in the alphabet
  // string. Add 1 to the index to get the score (since indexing starts at 0, but
  // the scores start at 1).
  return alphabet.indexOf(char) + 1;
}

// Define a function that takes an array of strings as input, and returns the common
// character in groups of three array entries.
function findCommonCharInArray(arr: string[]) {
  // Loop over the array, three entries at a time.
  for (let i = 0; i < arr.length; i += 3) {
    const element = arr[i];

    // Loop over each character in the first string.
    for (let j = 0; j < element.length; j++) {
      const char = element[j];
      let res = calculateBadgeScore(arr, i, char);
      if (res) {
        break;
      }
    }
  }
}

function calculateBadgeScore(arr: string[], i: number, char: string) {
  // If the character appears in the second and third strings, calculate it's score.
  if (arr[i + 1].includes(char) && arr[i + 2].includes(char)) {
    // calculate score of char and add it to score2
    let tempScore = getScore(char);
    // console.log(char, tempScore);
    score2 += tempScore;
    return true;
  }
  return false;
}

console.log("Score: ", score);
console.log("Badge Score: ", score2);
