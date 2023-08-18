const calculatorButtons = document.getElementsByClassName("calculatorButton");
const displayElement = document.getElementById("displayText");
const decimalElement = document.getElementById("decimalPlacesInput");
const inputs = document.getElementsByTagName("input");

let DECIMAL_ROUNDING = 100000;
let currentNumHasDecimal = false;
let errored = false;
let typing = false;

for (let i = 0; i < calculatorButtons.length; i++) {
    let button = calculatorButtons[i];
    if (!(isNaN(button.innerHTML))) {
        button.setAttribute("id", button.innerHTML);
        button.setAttribute("onclick", "inputNumber(" + button.innerHTML + ")");
    }
}

let displayMessage = "";

function calculate() {
    if (!(endsWithNum())) {
        alert("e")
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

                displayArray = ArrayInsertNewInt(displayArray, i, newInt);
                loopLength = displayArray.length;
                i = 0;
            } else {
                if (front < 0) {
                    calculatorError("Radicand can't be negative");
                    return;
                }
                newInt = Math.sqrt(front);

                if (!isNaN(behind)) {
                    newInt *= behind;
                }

                displayArray = ArrayInsertNewInt(displayArray, i, newInt);
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

            displayArray = ArrayInsertNewInt(displayArray, i, newInt);
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

            displayArray = ArrayInsertNewInt(displayArray, i, newInt);
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

    updateCalculationDisplay();
    buttonPressCSS('calculateButton');
}

function ArrayInsertNewInt(array, index, newNumber) {
    array[index] = newNumber;
    array[index-1] = undefined;
    array[index+1] = undefined;
    return array.filter(num => num != undefined);
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].onfocus = () => {
        typing = true;
    }

    inputs[i].onblur = () => {
        typing = false;
        updateDecimalRounding();
    }
}

function updateDecimalRounding() {
    let decimalInt = decimalElement.value;

    if (decimalInt > 16) {
        decimalInt = 16;
        decimalElement.value = decimalInt;
    } else if (decimalInt % 1 != 0) {
        decimalInt = decimalInt.substring(0, decimalInt.indexOf("."));
        decimalElement.value = decimalInt;
    }

    let roundingInt = "1";
    for (let i = 0; i < decimalInt; i++) {
        roundingInt += "0";
    }

    DECIMAL_ROUNDING = roundingInt;
}

function endingCharacter() {
    return displayElement.innerText[displayElement.innerText.length-1];
}

function endsWithNum() {
     return isNaN(endingCharacter()) ? false : true
}

function updateCalculationDisplay() {
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
    updateCalculationDisplay();
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
    
    updateCalculationDisplay();
    buttonPressCSS('decimalButton');
}

function backspace() {
    checkErrored();

    if (displayMessage.endsWith(" ")) {
      displayMessage = displayMessage.substring(0, displayMessage.length-3);  
    } else {
        displayMessage = displayMessage.substring(0, displayMessage.length-1);
    }
    
    updateCalculationDisplay();
    buttonPressCSS('backspaceButton');
}

function inputNumber(input) {
    checkErrored();
    displayMessage = displayMessage.concat(input);
    updateCalculationDisplay();
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
    if (!endsWithNum()) {
        return;
    }
    checkErrored();
    displayMessage = displayMessage.concat(" " + input + " ");
    currentNumHasDecimal = false;
    updateCalculationDisplay();
    buttonPressCSS(input);
}

function invalidStatement() {
    displayElement.style.color = "red";
    setTimeout(() => {
        displayElement.style.color = "black"; 
    }, 300);
}