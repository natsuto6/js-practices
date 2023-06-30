#!/usr/bin/env node

import { createInterface } from "readline";
import MemoDB from "./memoDB.js";
import Memo from "./memo.js";
import minimist from "minimist";

async function main() {
  const memoDB = new MemoDB();
  const memo = new Memo(memoDB);
  const argv = minimist(process.argv.slice(2));
  if (!process.stdin.isTTY) {
    const lines = await readStdin();
    const createdMemo = await memo.create(lines);
    console.log(
      "\nYour memo, '" + createdMemo + "', has been successfully saved."
    );
  }

  if (argv.l) {
    const allMemos = await memo.showAll();
    if (memo.hasNoMemo(allMemos)) {
      console.log("No memos found. Please create a new one.");
    }
  }

  if (argv.r) {
    const memoContent = await memo.show();
    if (memoContent) {
      console.log("\n" + memoContent);
    } else {
      console.log("No memos found. Please create a new one.");
    }
  }

  if (argv.d) {
    const deletedMemo = await memo.delete();
    if (deletedMemo) {
      console.log("\nThe selected memo has been successfully deleted.");
    } else {
      console.log("No memos found. Please create a new one.");
    }
  }
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
