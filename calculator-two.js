document.addEventListener("DOMContentLoaded", function() {
  let display = document.getElementById("display");
  let clearBtn = document.getElementById("clear");
  let equalsBtn = document.getElementById("equals");
  let decimalBtn = document.getElementById("decimal");

  let operators = document.getElementsByClassName("operator");
  let numbers = document.getElementsByClassName("number");

  let currentNumber = "";
  let firstOperand = null;
  let operator = null;
  let shouldResetDisplay = false;

  // Helper function to update the display
  function updateDisplay(value) {
    display.textContent = value;
  }

  // Helper function to perform the calculation
  function calculate() {
    let result = "";
    switch (operator) {
      case "+":
        result = parseFloat(firstOperand) + parseFloat(currentNumber);
        break;
      case "-":
        result = parseFloat(firstOperand) - parseFloat(currentNumber);
        break;
      case "*":
        result = parseFloat(firstOperand) * parseFloat(currentNumber);
        break;
      case "/":
        result = parseFloat(firstOperand) / parseFloat(currentNumber);
        break;
      default:
        return;
    }
    result = Math.round(result * 10000) / 10000; // Rounding to 4 decimal places
    currentNumber = result;
    operator = null;
    shouldResetDisplay = true;
    firstOperand = null;
  }

  // Clear the calculator
  clearBtn.addEventListener("click", function() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay(0);
  });

  // Handle number button clicks
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function() {
      if (shouldResetDisplay) {
        currentNumber = "";
        shouldResetDisplay = false;
      }
      if (currentNumber.length >= 10) {
        return;
      }
      if (currentNumber === "0" && this.id === "zero") {
        return;
      }
      currentNumber += this.textContent;
      updateDisplay(currentNumber);
    });
  }

  // Handle operator button clicks
  for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function() {
      if (currentNumber === "") {
        if (this.textContent !== "-") {
          return;
        }
        currentNumber += this.textContent;
        updateDisplay(currentNumber);
        return;
      }
      if (firstOperand !== null && operator !== null) {
        calculate();
      }
      if (operator === null && this.textContent !== "-") {
        operator = this.textContent;
      } else if (operator !== null && this.textContent !== "-") {
        operator = this.textContent;
      }
      shouldResetDisplay = true;
      firstOperand = currentNumber;
    });
  }

  // Handle equal button click
  equalsBtn.addEventListener("click", function() {
    if (currentNumber === "" || firstOperand === null || operator === null) {
      return;
    }
    calculate();
    updateDisplay(currentNumber);
  });

  // Handle decimal button click
  decimalBtn.addEventListener("click", function() {
    if (shouldResetDisplay) {
      currentNumber = "0";
      shouldResetDisplay = false;
    }
    if (currentNumber.includes(".")) {
      return;
    }
    currentNumber += ".";
    updateDisplay(currentNumber);
  });
});

