import Menu from "./menu.js";

export default class Memo {
  constructor(table) {
    this.table = table;
  }

  async create(lines) {
    await this.table.insert("text", lines.join("\n"));
    console.log("\nYour memo has been successfully saved.");
  }

  async showAll() {
    const allMemos = await this.table.selectAll();
    if (!this.doesMemoExist(allMemos)) {
      return;
    }

    for (let memo of allMemos) {
      console.log(memo.text.split("\n")[0]);
    }
  }

  async show() {
    const allMemos = await this.table.selectAll();
    if (!this.doesMemoExist(allMemos)) {
      return;
    }
    const selectedMemo = await this.select(allMemos, "see");
    const selectedRow = await this.table.select(selectedMemo.id);
    console.log("\n" + selectedRow.text);
  }

  async delete() {
    const allMemos = await this.table.selectAll();
    if (!this.doesMemoExist(allMemos)) {
      return;
    }
    const selectedMemo = await this.select(allMemos, "delete");
    await this.table.delete(selectedMemo.id);
    console.log("\nThe selected memo has been successfully deleted.");
  }

  async select(memos, purpose) {
    const menu = new Menu(memos);
    return await menu.chooseMemoId("id", purpose);
  }

  doesMemoExist(memos) {
    if (memos.length === 0) {
      console.log("No memos found. Please create a new one.");
      return false;
    }

    return true;
  }
}
