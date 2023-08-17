const calculatorButtons = document.getElementsByClassName("calculatorButton");
const displayElement = document.getElementById("displayText");
const DECIMAL_ROUNDING = 100000000000;
let currentNumHasDecimal = false;
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

    for (let i = 0; i < loopLength; i++) { //EXPONENTS
        if (displayArray[i] == "^" || displayArray[i] == "√") {

            let behind = parseFloat(displayArray[i-1]);
            let front = parseFloat(displayArray[i+1]);

            if (displayArray[i] == "^") {
                newInt = behind ** front;

                displayArray = AdjustArray(displayArray, i, newInt);
                loopLength = displayArray.length;
                i = 0;
            } else {
                newInt = Math.sqrt(front);
                displayArray[i+1] = undefined;
                
                if (!isNaN(behind)) {
                    newInt *= behind;
                }

                displayArray[i-1] = undefined;
                displayArray[i] = newInt;

                displayArray = displayArray.filter(num => num != undefined);
                loopLength = displayArray.length;
                i = 0;
            }
        }
    }

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

    displayMessage.includes(".") ? currentNumHasDecimal = true : currentNumHasDecimal = false;

    updateDisplay();
    buttonPressCSS('calculateButton');
}

function AdjustArray(array, index, newNumber) {
    array[index] = newNumber;
    array[index-1] = undefined;
    array[index+1] = undefined;
    return array.filter(num => num != undefined);
}

function endingCharacter() {
    return displayElement.innerText[displayElement.innerText.length-1];
}

function endsWithNum() {
     return isNaN(endingCharacter()) ? false : true
}

function updateDisplay() {
    displayElement.innerText = displayMessage.replace(/\s/g, "");
}

function clearDisplay() {
    displayMessage = "";
    displayElement.innerText = displayMessage;
    currentNumHasDecimal = false;
    buttonPressCSS('clearButton');
}

function squareroot() {
    checkErrored();
    if (endingCharacter() != "√") {
        displayMessage = displayMessage.concat(" √ ");
    }
    updateDisplay();
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
    if (!currentNumHasDecimal) {
        displayMessage = displayMessage.concat(".");
        currentNumHasDecimal = true;
    }
    
    updateDisplay();
    buttonPressCSS('decimalButton');
}

function backspace() {
    checkErrored();

    if (displayMessage.endsWith(" ")) {
      displayMessage = displayMessage.substring(0, displayMessage.length-3);  
    } else {
        displayMessage = displayMessage.substring(0, displayMessage.length-1);
    }
    
    updateDisplay();
    buttonPressCSS('backspaceButton');
}

function inputNumber(input) {
    checkErrored();
    displayMessage = displayMessage.concat(input);
    updateDisplay();
    buttonPressCSS(input);
}

function buttonPressCSS(id) {
    const element = document.getElementById(id);
    element.classList.add('buttonActivePsuedoClass');
    setTimeout(() => {
        element.classList.remove('buttonActivePsuedoClass');
    }, 100);
}

function inputOpperand(input) {
    if (checkLastIndexForNonInteger()) {
        return;
    }
    checkErrored();
    displayMessage = displayMessage.concat(" " + input + " ");
    currentNumHasDecimal = false;
    updateDisplay();
    buttonPressCSS(input);
}

function invalidStatement() {
    displayElement.style.color = "red";
    setTimeout(() => {
        displayElement.style.color = "black"; 
    }, 300);
}