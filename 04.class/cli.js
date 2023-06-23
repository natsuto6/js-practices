#!/usr/bin/env node

import pkg from "sqlite3";
const { Database } = pkg;
import { createInterface } from "readline";
import Memo from "./memo.js";
import Table from "./table.js";
import minimist from "minimist";

async function main() {
  const sqlite3 = new Database("./db/memo.sqlite3");
  const memoTable = new Table(sqlite3, "memos");
  const memo = new Memo(memoTable);
  const argv = minimist(process.argv.slice(2));
  if (!process.stdin.isTTY) {
    const lines = await readStdin();
    await memo.create(lines);
  }

  if (argv.l) {
    await memo.showAll();
  } else if (argv.r) {
    await memo.show();
  } else if (argv.d) {
    await memo.delete();
  }

  sqlite3.close();
}

function readStdin() {
  return new Promise((resolve) => {
    const lines = [];
    const reader = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    reader.on("line", (line) => {
      lines.push(line);
    });

    reader.on("close", () => {
      resolve(lines);
    });
  });
}

main();
