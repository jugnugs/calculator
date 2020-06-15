function operate(operator, a, b) {
    let result;
    switch (operator) {
        case "add":
            result = add(a, b);
            break;
        case "subtract":
            result = subtract(a, b);
            break;
        case "multiply":
            result = multiply(a, b);
            break;
        case "divide":
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

const calculator = document.querySelector("#calculator");
const display = calculator.querySelector("#display-digits");
let displayValue = "";

const numberBtns = Array.from(calculator.querySelectorAll("#num-pad button.num"));
numberBtns.forEach(btn => btn.addEventListener("click", (e) => {
    displayValue += e.target.textContent;
    display.textContent = displayValue;
}));

let firstOperand, secondOperand, operatorSymbol;
let operator;
const operatorBtns = Array.from(calculator.querySelectorAll("#operators button.operate"));
operatorBtns.forEach(btn => btn.addEventListener("click", (e) => {
    firstOperand = parseInt(displayValue);
    operatorSymbol = e.target.textContent;
    displayValue += operatorSymbol;
    operator = e.target.id;
}));

const equalsBtn = calculator.querySelector("#num-pad button#equals");
equalsBtn.addEventListener("click", (e) => {
    secondOperand = displayValue.replace(firstOperand + operatorSymbol, "");
    let result = operate(operator, firstOperand, secondOperand);
    console.log(result);
});