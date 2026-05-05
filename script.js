let currentInput = "0";
let expression = "";
let pendingOperator = null;
let storedOperand = null;
let waitingForOperand = false;

const resultDiv = document.getElementById("resultDisplay");
const expressionDiv = document.getElementById("expressionDisplay");

function updateDisplay() {
    resultDiv.innerText = currentInput;
    expressionDiv.innerText = expression;
}

function inputDigit(d) {
    if (waitingForOperand) {
        currentInput = d.toString();
        waitingForOperand = false;
    } else {
        currentInput = currentInput === "0" ? d.toString() : currentInput + d;
    }
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}

function clearAll() {
    currentInput = "0";
    expression = "";
    pendingOperator = null;
    storedOperand = null;
    updateDisplay();
}

function setOperator(op) {
    storedOperand = currentInput;
    pendingOperator = op;
    expression = currentInput + " " + op;
    waitingForOperand = true;
}

function compute() {
    if (!pendingOperator) return;

    let a = parseFloat(storedOperand);
    let b = parseFloat(currentInput);
    let result;

    switch (pendingOperator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "×": result = a * b; break;
        case "÷": result = b === 0 ? "Error" : a / b; break;
    }

    currentInput = result.toString();
    expression = "";
    pendingOperator = null;
    updateDisplay();
}

const buttons = [
    "AC","⌫","%","÷",
    "7","8","9","×",
    "4","5","6","-",
    "1","2","3","+",
    "0",".","="
];

const container = document.getElementById("buttonsContainer");

buttons.forEach(btn => {
    const b = document.createElement("button");
    b.innerText = btn;

    b.onclick = () => {
        if (!isNaN(btn)) inputDigit(btn);
        else if (btn === ".") inputDecimal();
        else if (btn === "AC") clearAll();
        else if (btn === "=") compute();
        else setOperator(btn);
    };

    container.appendChild(b);
});

updateDisplay();