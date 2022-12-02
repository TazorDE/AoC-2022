/**
 * Copyright 2022 - Malte Teichert
 * Advent of Code Day 2
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("./input.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);

// transform lines into a more workable format
const strategy: string[][] = [];

lines.forEach(line => {
  strategy.push([line.charAt(0), line.charAt(2)])
});

// calculate points
/**
 * A/X Rock 1
 * B/Y Paper 2
 * C/Z Scissors 3
 * Win - 6
 * Draw - 3
 * Loose - 0
 */

let points = 0;
strategy.forEach(game => {
  game = chooseOutcome(game);
  let res = gamePoints(game);
  let usage = usagePoints(game);
  points += res;
  points += usage;
  console.log(res, usage, points);
});
console.log('StrategyGuidePoints:', points);


function gamePoints(input: string[]): number {
  if (isDraw(input)) {
    // draw
    return 3;
  }
  if (input[1] == 'X' && input[0] == 'C') {
    return 6;
  }
  if (input[1] == 'Y' && input[0] == 'A') {
    return 6;
  }
  if (input[1] == 'Z' && input[0] == 'B') {
    return 6;
  }
  return 0;
}

function usagePoints(input: string[]): number {
  if (input[1] == 'X') {
    return 1;
  }
  if (input[1] == 'Y') {
    return 2;
  }
  // if (input[1] == 'Z') {
  return 3;
}

function isDraw(input: string[]): boolean {

  if (input[0] == 'A' && input[1] == 'X') {
    return true;
  }
  if (input[0] == 'B' && input[1] == 'Y') {
    return true;
  }
  if (input[0] == 'C' && input[1] == 'Z') {
    return true;
  }
  return false;
}

function chooseOutcome(input: string[]): string[] {
  /**
   * X - lose
   * Y - draw
   * Z - win
   */
  if (input[1] == 'X') {
    return generateLoss(input[0]);
  }
  if (input[1] == 'Y') {
    return generateDraw(input[0]);
  }
  return generateWin(input[0]);
}

function generateLoss(input: string): string[] {
  if (input == 'A') {
    return ['A', 'Z'];
  }
  if (input == 'B') {
    return ['B', 'X'];
  }
  return ['C', 'Y'];
}
function generateDraw(input: string): string[] {
  if (input == 'A') {
    return ['A', 'X'];
  }
  if (input == 'B') {
    return ['B', 'Y'];
  }
  return ['C', 'Z'];
}
function generateWin(input: string): string[] {
  if (input == 'A') {
    return ['A', 'Y'];
  }
  if (input == 'B') {
    return ['B', 'Z'];
  }
  return ['C', 'X'];
}