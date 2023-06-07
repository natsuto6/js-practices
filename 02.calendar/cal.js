#!/usr/bin/env node

const { DateTime } = require("luxon");

const args = require("minimist")(process.argv.slice(2));
const year = args.y ? parseInt(args.y, 10) : DateTime.local().year;
const month = args.m ? parseInt(args.m, 10) : DateTime.local().month;

const startOfMonth = DateTime.local(year, month, 1);
const endOfMonth = startOfMonth.endOf("month");

let calendarOutput = "";

calendarOutput += `      ${startOfMonth.monthLong}月 ${startOfMonth.year}        \n`;

calendarOutput += "日 月 火 水 木 金 土\n";

for (
  let i = 0;
  i < (startOfMonth.weekday === 7 ? 0 : startOfMonth.weekday);
  i++
) {
  calendarOutput += "   ";
}

for (let i = startOfMonth; i <= endOfMonth; i = i.plus({ days: 1 })) {
  calendarOutput += i.day.toString().padStart(2, " ");

  if (i.weekday === 6) {
    calendarOutput += "\n";
  } else {
    calendarOutput += " ";
  }
}

process.stdout.write(calendarOutput + "\n");
