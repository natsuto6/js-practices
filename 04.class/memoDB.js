import pkg from "sqlite3";
const { Database } = pkg;

export default class MemoDB {
  constructor() {
    this.db = new Database("./db/memo.sqlite3");
    this.tableName = "memos";

    this.db.serialize(() => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)`,
        (err) => {
          if (err) {
            console.error(err.message);
          }
        }
      );
    });
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM " + this.tableName, (err, rows) => {
        err ? reject(new Error(err)) : resolve(rows);
      });
    });
  }

  select(id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM " + this.tableName + " WHERE id = ?",
        id,
        (err, row) => {
          err ? reject(new Error(err)) : resolve(row);
        }
      );
    });
  }

  insert(columnName, text) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO " + this.tableName + "(" + columnName + ")" + " values(?)",
        text,
        (err) => {
          err ? reject(new Error(err)) : resolve();
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "DELETE FROM " + this.tableName + " WHERE id = ?",
        id,
        (err) => {
          err ? reject(new Error(err)) : resolve();
        }
      );
    });
  }

  close() {
    this.db.close;
  }
}
