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
    for (let memo of allMemos) {
      console.log(memo.text.split("\n")[0]);
    }
  }

  async show(id) {
    const selectedRow = await this.table.select(id);
    console.log("\n" + selectedRow.text);
  }

  async delete(id) {
    await this.table.delete(id);
    console.log("\nThe selected memo has been successfully deleted.");
  }
}
