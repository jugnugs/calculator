function operate(operator, a, b) {
    let result;
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
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

const numberBtns = Array.from(document.querySelectorAll("button.num"));
numberBtns.forEach(btn => btn.addEventListener("click", (e) => {
    console.log(e.target.textContent);
    displayValue += e.target.textContent;
    display.textContent = displayValue;
}));