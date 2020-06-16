function operate(operator, a, b) {
    let result;
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "×":
            result = multiply(a, b);
            break;
        case "÷":
            result = divide(a, b);
            break;
    }
    return result;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;

}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function onNumClick(e) {
    displayValue += e.target.textContent;
    updateDisplay(displayValue);
}

function onOperatorClick(e) {
    let operand = displayValue;
    if (currentOperations.length > 0) {
        let lastOperationIndex = displayValue.indexOf(currentOperations[currentOperations.length - 1]);
        operand = displayValue.slice(lastOperationIndex + 1);
    }
    currentNums.push(parseInt(operand));
    currentOperations.push(e.target.textContent);
    displayValue += e.target.textContent;
    updateDisplay(displayValue);
}

// check for multiplication/division operators
function checkMD(operator) {
    return operator === "×" || operator === "÷";
}

// check for addition/subtraction operators
function checkAS(operator) {
    return operator === "+" || operator === "-";
}

function onEqualsClick(e) {
    // get the last operand
    let lastOperationIndex = displayValue.indexOf(currentOperations[currentOperations.length - 1]);
    let lastOperand = parseInt(displayValue.slice(lastOperationIndex + 1));
    currentNums.push(lastOperand);
    
    // execute operations in PEMDAS order
    let numOperations = currentOperations.length;
    for (let i = 0; i < numOperations; i++) {
        let operator, index, result;
        if (currentOperations.find(checkMD)) {
            operator = currentOperations.find(checkMD);
            index = currentOperations.findIndex(checkMD);
        } else {
            operator = currentOperations.find(checkAS);
            index = currentOperations.findIndex(checkAS);
        }
        result = operate(operator, currentNums[index], currentNums[index + 1]);
        updateDisplay(result);
        currentNums.splice(index, 2, result);
        currentOperations.splice(index, 1);
    }
}

function updateDisplay(newDisplay) {
    display.textContent = newDisplay;
}

const calculator = document.querySelector("#calculator");
const display = calculator.querySelector("#display-digits");
let currentNums = [];
let currentOperations = [];
let displayValue = "";

const numberBtns = Array.from(calculator.querySelectorAll("#num-pad button.num"));
numberBtns.forEach(btn => btn.addEventListener("click", onNumClick));

let firstOperand, secondOperand;
let operator;
const operatorBtns = Array.from(calculator.querySelectorAll("#operators button.operate"));
operatorBtns.forEach(btn => btn.addEventListener("click", onOperatorClick));

const equalsBtn = calculator.querySelector("#num-pad button#equals");
equalsBtn.addEventListener("click", onEqualsClick);