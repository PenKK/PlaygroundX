let calculatorButtons = document.getElementsByClassName("calculatorButton");
const displayElement = document.getElementById("displayText");
const DECIMAL_ROUNDING = 100000000000;
let errored = false;

for (let i = 0; i < calculatorButtons.length; i++) {
    let button = calculatorButtons[i];
    if (!(isNaN(button.innerHTML))) {
        button.setAttribute("id", button.innerHTML);
        button.setAttribute("onclick", "inputNumber(" + button.innerHTML + ")");
    }
}

let displayMessage = "";

function checkLastIndexForNonInteger() {
    if (isNaN(displayMessage.trim()[displayMessage.length-1])) {
        return true;
    }
    return false;
}

function calculate() {
    if (!(endsWithNum())) {
        invalidStatement();
        return; 
    }

    let displayArray = displayMessage.split(" ");
    let loopLength = displayArray.length;

    for (let i = 0; i < loopLength; i++) { //MULTIPLY + DIVIDE
        if (displayArray[i] == "x" || displayArray[i] == "/") {

            let behind = parseFloat(displayArray[i-1]);
            let front = parseFloat(displayArray[i+1]);

            
            if (displayArray[i] == "x") {
                newInt = behind * front;
            } else {
                if (front == 0) {
                    calculatorError("Can't divide by 0");
                    return;
                }
                newInt = behind / front;
            }

            displayArray = AdjustArray(displayArray, i, newInt);
            loopLength = displayArray.length;
            i = 0;
        }
    }

    for (let i = 0; i < loopLength; i++) { //ADD + SUBTRACT
        if (displayArray[i] == "+" || displayArray[i] == "-") {

            let newInt;
            let behind = parseFloat(displayArray[i-1]);
            let front = parseFloat(displayArray[i+1]);

            if (displayArray[i] == "+") {
                newInt = behind + front;
            } else {
                newInt = behind - front;
            }

            displayArray = AdjustArray(displayArray, i, newInt);
            loopLength = displayArray.length;
            i = 0;
        }
    }

    if (isNaN(displayArray[0])) {
        displayMessage = "Error";
        errored = true;
    } else {
        displayMessage = (Math.round(displayArray[0] * DECIMAL_ROUNDING) / DECIMAL_ROUNDING).toString();
    }
    updateDisplay();
}

function AdjustArray(array, index, newNumber) {
    array[index] = newNumber;
    array[index-1] = undefined;
    array[index+1] = undefined;
    return array.filter(num => num != undefined);
}

function endsWithNum() {
     return isNaN(displayElement.innerText[displayElement.innerText.length-1]) ? false : true
}

function updateDisplay() {
    displayElement.innerText = displayMessage.replace(/\s/g, "");
}

function clearDisplay() {
    displayMessage = "";
    displayElement.innerText = displayMessage;
}

function calculatorError(message) {
    errored = true;
    displayMessage = message;
    displayElement.innerText = displayMessage;
}

function checkErrored() {
    if (errored) {
        displayMessage = "";
        errored = false;
    }
}

function decimal() {
    checkErrored();

    if (endsWithNum())
    displayMessage = displayMessage.concat(".");
    updateDisplay();
}

function backspace() {
    checkErrored();
    if (displayMessage.endsWith(" ")) {
      displayMessage = displayMessage.substring(0, displayMessage.length-3);  
    } else {
        displayMessage = displayMessage.substring(0, displayMessage.length-1);
    }
    
    updateDisplay();
}

function inputNumber(input) {
    checkErrored();
    displayMessage = displayMessage.concat(input);
    updateDisplay();
}

function inputOpperand(input) {
    if (checkLastIndexForNonInteger()) {
        return;
    }
    checkErrored();
    displayMessage = displayMessage.concat(" " + input + " ");
    updateDisplay();
}

function invalidStatement() {
    displayElement.style.color = "red";
    setTimeout(() => {
        displayElement.style.color = "black"; 
    }, 300);
}