import Menu from "./menu.js";

export default class Memo {
  constructor(memoDB) {
    this.memoDB = memoDB;
  }

  async create(lines) {
    await this.memoDB.insert("text", lines.join("\n"));
    return lines.join("\n");
  }

  async showAll() {
    const allMemos = await this.memoDB.selectAll();
    if (this.hasNoMemo(allMemos)) {
      return [];
    }

    for (let memo of allMemos) {
      console.log(memo.text.split("\n")[0]);
    }
    return allMemos;
  }

  async show() {
    const allMemos = await this.memoDB.selectAll();
    if (this.hasNoMemo(allMemos)) {
      return null;
    }
    const selectedMemo = await this.select(allMemos, "see");
    const selectedRow = await this.memoDB.select(selectedMemo.id);
    return selectedRow.text;
  }

  async delete() {
    const allMemos = await this.memoDB.selectAll();
    if (this.hasNoMemo(allMemos)) {
      return null;
    }
    const selectedMemo = await this.select(allMemos, "delete");
    await this.memoDB.delete(selectedMemo.id);
    return selectedMemo;
  }

  async select(memos, purpose) {
    const menu = new Menu(memos);
    return await menu.chooseMemoId("id", purpose);
  }

  hasNoMemo(memos) {
    return memos.length === 0;
  }
}
