class Calculator {
  constructor(topOperandText, bottomOperandText) {
    this.topOperandText = topOperandText;
    this.bottomOperandText = bottomOperandText;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.bottomOperand = "";
    this.topOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.bottomOperand = this.bottomOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.bottomOperand.includes(".")) return;
    this.bottomOperand = this.bottomOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.bottomOperand === "") return;
    if (this.topOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.topOperand = this.bottomOperand;
    this.bottomOperand = "";
  }

  compute() {
    let computation;
    const top = parseFloat(this.topOperand);
    const bottom = parseFloat(this.bottomOperand);
    if (isNaN(top) || isNaN(bottom)) return;
    switch (this.operation) {
      case "+":
        computation = top + bottom;
        break;
      case "-":
        computation = top - bottom;
        break;
      case "*":
        computation = top * bottom;
        break;
      case "÷":
        computation = top / bottom;
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.bottomOperand = computation;
    this.operation = undefined;
    this.topOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.bottomOperandText.innerText = this.getDisplayNumber(
      this.bottomOperand
    );
    if (this.operation != null) {
      this.topOperandText.innerText = `${this.getDisplayNumber(
        this.topOperand
      )} ${this.operation}`;
    } else {
      this.topOperandText.innerText = "";
    }
  }
}

const nrButtons = document.querySelectorAll("[data-number]");
const opButtons = document.querySelectorAll("[data-operation]");
const acButtons = document.querySelector("[data-all-clear]");
const delButtons = document.querySelector("[data-delete]");
const eqButtons = document.querySelector("[data-equals]");
const topOperandText = document.querySelector("[data-topOperand]");
const bottomOperandText = document.querySelector("[data-bottomOperand]");

const calculator = new Calculator(topOperandText, bottomOperandText);

nrButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (
      calculator.topOperand === "" &&
      calculator.bottomOperand !== "" &&
      calculator.readyToReset
    ) {
      calculator.bottomOperand = "";
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

opButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

eqButtons.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
});

acButtons.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

delButtons.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
});
