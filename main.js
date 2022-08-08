class Calaculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendnumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  chooseoperation(operation) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previous);
    const current = parseFloat(this.current);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.current = computation;
    this.operation = undefined;
    this.previous = "";
  }

  getDisplayNumber(number) {
    const stringnumber = number.toString();
    const integerDigits = parseFloat(stringnumber.split(".")[0]);
    const decimaldigits = stringnumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimaldigits != null) {
      return `${integerDisplay}.${decimaldigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentTextElement.innerText = this.getDisplayNumber(this.current);
    if (this.operation != null) {
      this.previousTextElement.innerText = `${this.getDisplayNumber(
        this.previous
      )} ${this.operation}`;
    } else {
      this.previousTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allclearButton = document.querySelector("[data-all-clear]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");

const calaculator = new Calaculator(previousTextElement, currentTextElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calaculator.appendnumber(button.innerText);
    calaculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calaculator.chooseoperation(button.innerText);
    calaculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calaculator.compute();
  calaculator.updateDisplay();
});

allclearButton.addEventListener("click", (button) => {
  calaculator.clear();
  calaculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calaculator.delete();
  calaculator.updateDisplay();
});
