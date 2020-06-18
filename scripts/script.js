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

function clearData(display) {
    displayValue = display;
    currentNums = [];
    currentOperations = [];
}

function updateDisplay(newDisplay) {
    display.textContent = newDisplay;
}

// check for multiplication/division operators
function checkMD(operator) {
    return operator === "×" || operator === "÷";
}

// check for addition/subtraction operators
function checkAS(operator) {
    return operator === "+" || operator === "-";
}

function pushOperand(operand) {
    currentNums.push(parseFloat(operand));
}

function onNumClick(e) {
    if (expectNewNum) {
        displayValue = e.target.textContent;
        expectNewNum = false;
    }
    else displayValue += e.target.textContent;
    updateDisplay(displayValue);
}

function onOperatorClick(e) {
    // return if user tries to enter operator first
    if (displayValue === "") {
        return;
    } 
    pushOperand(displayValue);
    currentOperations.push(e.target.textContent);
    expectNewNum = true;
}

function onEqualsClick(e) {
    pushOperand(displayValue);
    // check to make sure all numbers/operators are
    // entered
    if (isNaN(currentNums[currentNums.length - 1]) || 
    currentOperations.length == 0) {
        currentNums.pop();
        return;
    } 
    
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

        // check if dividing by 0
        if (operator === "÷" && currentNums[index + 1] === 0) {
            clearData("");
            updateDisplay("DON'T TRY");
            return;
        }
        result = operate(operator, currentNums[index], currentNums[index + 1]);
        const roundToPlaces = 1000000000;
        displayValue = Math.round((result + Number.EPSILON) * roundToPlaces) / roundToPlaces;
        updateDisplay(displayValue);
        currentNums.splice(index, 2, result);
        currentOperations.splice(index, 1);
    }
    clearData(displayValue);
}

function onClearClick(e) {
    clearData("");
    updateDisplay("0");
}

let expectNewNum = true;
let currentNums = [];
let currentOperations = [];
let displayValue = "";

const calculator = document.querySelector("#calculator");
const display = calculator.querySelector("#display-digits");

const numberBtns = Array.from(calculator.querySelectorAll("#num-pad button.num"));
numberBtns.forEach(btn => btn.addEventListener("click", onNumClick));

const operatorBtns = Array.from(calculator.querySelectorAll("#operators button.operate"));
operatorBtns.forEach(btn => btn.addEventListener("click", onOperatorClick));

const equalsBtn = calculator.querySelector("#num-pad button#equals");
equalsBtn.addEventListener("click", onEqualsClick);

const clearBtn = calculator.querySelector("#operators button#clear");
clearBtn.addEventListener("click", onClearClick);
