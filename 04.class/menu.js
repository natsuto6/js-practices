import pkg from "enquirer";
const { prompt } = pkg;

export default class Menu {
  constructor(choices) {
    this.choices = choices.map((item) => ({
      name: item.text.split("\n")[0],
      value: item.id,
    }));
  }

  async chooseMemoId(name, action) {
    return await prompt({
      type: "select",
      name: name,
      message: `Choose a memo you want to ${action}:`,
      choices: this.choices,
      result() {
        return this.focused.value;
      },
    });
  }
}
