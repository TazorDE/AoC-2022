/**
 * Copyright 2022 - Malte Teichert
 * Advent of Code Day 8
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("C:\\Users\\Teichertm\\GitHub\\AoC-2022\\day8\\input.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);

let visibleTrees = 0;
let highestScenicScore = 0;
let heightMap: number[][] = [];

// Build 2D Array of all Tree Heights
lines.forEach((line, index) => {
  let lineArray: number[] = [];
  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    if (!Number.isNaN(parseInt(char))) {
      lineArray.push(parseInt(line[i]));
    }
  }
  heightMap.push(lineArray);
});

console.info('Height Map:');
console.log(heightMap);

// loop through 2D Array
heightMap.forEach((row: number[], rowIndex: number,) => {
  row.forEach((value: number, valIndex: number) => {
    // check if value is on border
    if (isOnBorder(heightMap, rowIndex, valIndex)) {
      visibleTrees++;
      return;
    }
    // calculate visibility
    if (isVisible(heightMap, rowIndex, valIndex)) {
      visibleTrees++;
    }
  });
});

console.log('visible trees:', visibleTrees);
console.log('highest scenic score:', highestScenicScore);

function isOnBorder(array: number[][], row: number, column: number): boolean {
  // Check if the given row and column indices are on the border of the array
  return (row === 0 || row === array.length - 1 || column === 0 || column === array[row].length - 1);
}

function isVisible(array: number[][], row: number, column: number): boolean {
  let currentRow = array[row];
  let isHighestWest = true;
  let isHighestEast = true;
  let isHighestNorth = true;
  let isHighestSouth = true;

  // check west
  for (let index = 0; index < column; index++) {
    if (currentRow[index] >= currentRow[column]) {
      isHighestWest = false;
    }
  }

  // check east
  for (let index = column + 1; index < currentRow.length; index++) {
    if (currentRow[index] >= currentRow[column]) {
      isHighestEast = false;
    }
  }

  // check north
  for (let index = 0; index < row; index++) {
    if (currentRow[column] <= array[index][column]) {
      isHighestNorth = false;
    }
  }
  // check south
  for (let index = row + 1; index < array.length; index++) {
    if (currentRow[column] <= array[index][column]) {
      isHighestSouth = false;
    }
  }

  let highestViewLen = [calculateViewLenWest(currentRow, column), calculateViewLenEast(currentRow, column), calculateViewLenNorth(heightMap, row, column), calculateViewLenSouth(heightMap, row, column)];
  let scenicScore = highestViewLen.reduce((a, b) => a * b, 1);

  if (scenicScore > highestScenicScore) { highestScenicScore = scenicScore };

  if (isHighestEast || isHighestWest || isHighestNorth || isHighestSouth) {
    return true;
  }
  return false;
}


function calculateViewLenWest(currentRow: number[], column: number) {
  let viewLenWest = 0;

  // calculate view length to the west
  for (let index = column - 1; index >= 0; index--) {
    if (currentRow[index] >= currentRow[column]) {
      viewLenWest++;
      return viewLenWest;
    }
    viewLenWest++;
  }
  return viewLenWest;
}

function calculateViewLenEast(currentRow: number[], column: number) {
  let viewLenEast = 0;

  for (let index = column + 1; index < currentRow.length; index++) {
    if (currentRow[index] >= currentRow[column]) {
      viewLenEast++;
      return viewLenEast;
    }
    viewLenEast++;
  }
  return viewLenEast;
}

function calculateViewLenNorth(heightMap: number[][], row: number, column: number) {
  let viewLen = 0;

  for (let index = row - 1; index >= 0; index--) {
    if (heightMap[index][column] >= heightMap[row][column]) {
      viewLen++;
      return viewLen;
    }
    viewLen++;
  }
  return viewLen;
}

function calculateViewLenSouth(heightMap: number[][], row: number, column: number) {
  let viewLen = 0;

  for (let index = row + 1; index < heightMap.length; index++) {
    if (heightMap[index][column] >= heightMap[row][column]) {
      viewLen++;
      return viewLen;
    }
    viewLen++;
  }
  return viewLen;
}