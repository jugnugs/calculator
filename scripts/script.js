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

function onNumClick() {
    numKeyEvent(this);
}

function numKeyEvent(key) {
    if (expectNewNum) {
        displayValue = key.textContent;
        expectNewNum = false;
    } else displayValue += key.textContent;
    updateDisplay(displayValue);
}

function onOperatorClick() {
    operatorKeyEvent(this);
}

function operatorKeyEvent(key) {
    // return if user tries to enter operator first
    if (displayValue === "") return;
    else if (!expectNewNum) {
        pushOperand(displayValue);
        let operator = key.textContent;
        currentOperations.push(operator);
        expectNewNum = true;
    }
}


function decimalKeyEvent() {
    if (expectNewNum || displayValue.includes(".")) return;
    displayValue += ".";
    updateDisplay(displayValue);
}

function equalsKeyEvent() {
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
        const roundToPlaces = 100000000;
        displayValue = (Math.round((result + Number.EPSILON) * roundToPlaces) / roundToPlaces).toString();
        updateDisplay(displayValue);
        currentNums.splice(index, 2, result);
        currentOperations.splice(index, 1);
    }
    clearData(displayValue);
}

function clearKeyEvent() {
    clearData("");
    updateDisplay("0");
}

function backKeyEvent() {
    if (!expectNewNum) {
        displayValue = displayValue.slice(0, -1);
        if (displayValue == "") {
            updateDisplay("0");
            expectNewNum = true;
        }
        else updateDisplay(displayValue);
    }
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
equalsBtn.addEventListener("click", equalsKeyEvent);

const clearBtn = calculator.querySelector("#operators button#clear");
clearBtn.addEventListener("click", clearKeyEvent);

const decimalBtn = calculator.querySelector("#num-pad button#decimal");
decimalBtn.addEventListener("click", decimalKeyEvent);

const backBtn = calculator.querySelector("#operators button#back");
backBtn.addEventListener("click", backKeyEvent);

document.addEventListener("keydown", (e) => {
    const key = e.key;
    numberBtns.forEach((numberBtn) => {
        if (key === numberBtn.textContent) {
            numKeyEvent(numberBtn);
            return;
        }
    });
    operatorBtns.forEach((operatorBtn) => {
        if (key === operatorBtn.textContent) {
            operatorKeyEvent(operatorBtn);
            return;
        } else if (key === "*" && 
        operatorBtn.textContent === "×") {
            operatorKeyEvent(operatorBtn);
            return;
        } else if (key === "/" &&
        operatorBtn.textContent === "÷") {
            operatorKeyEvent(operatorBtn);
            return;
        }
    });

    if (key === "=" || key === "Enter") {
        equalsKeyEvent();
        return;
    } else if (key === ".") {
        decimalKeyEvent();
        return;
    } else if (key === "c" || key === "C") {
        clearKeyEvent();
        return;
    } else if (key === "Backspace") {
        backKeyEvent();
    }

});