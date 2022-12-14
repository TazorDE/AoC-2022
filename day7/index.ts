/**
 * Copyright 2022 - Malte Teichert
 * Advent of Code Day 7
 */

// import statements
import { readFileSync } from "fs";

// read input from input.txt
const input: string = readFileSync("./input.txt", {
  encoding: "utf8",
  flag: "r",
});
const lines: string[] = input.split(/\r?\n/);

const { files, dirs } = loopThroughCommands(lines);
dirs.sort((a, b) => a.size - b.size);
const sum = dirs.reduce((acc, dir) => {
  if (dir.size < 100000) {
    return acc + dir.size;
  }
  return acc;
}, 0);

console.log(`Part 1: ${sum}`);

const totalFileSize = files.size;

const sizeRemaining = 70000000 - totalFileSize;
const sizeRequiredForUpgrade = 30000000 - sizeRemaining;

const smallestDir = dirs.find(dir => dir.size >= sizeRequiredForUpgrade);
console.log(`Part 2: ${smallestDir.size}`);

function loopThroughCommands(commands: string | any[], from = 0, name = "/") {
  let dirStructure = {
    size: 0,
    files: [],
    name: name,
  };
  const directories = [];

  let i = from;
  for (i; i < commands.length; i++) {
    let command = commands[i].split(" ");

    if (command[0] === "$") {
      if (command[1] === "cd") {
        if (command[2] === "..") {
          return { files: dirStructure, newI: i, dirs: directories };
        } else if (command[2] !== "/") {
          let { files, newI, dirs } = loopThroughCommands(commands, i + 1, command[2]);
          directories.push(files);
          directories.push(...dirs);
          i = newI;
          if (files) {
            dirStructure.files.push(files);
            dirStructure.size += files.size;
          }
        }
      }
    } else if (!isNaN(command[0])) {
      dirStructure.size += parseInt(command[0]);
      dirStructure.files.push({
        name: command[1],
        size: parseInt(command[0]),
      });
    }
  }
  return { files: dirStructure, newI: i, dirs: directories };
}