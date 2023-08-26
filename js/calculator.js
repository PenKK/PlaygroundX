const calculatorButtons = document.getElementsByClassName("calculatorButton");
const displayElement = document.getElementById("displayText");
const decimalElement = document.getElementById("decimalPlacesInput");
const inputs = document.getElementsByTagName("input");

let DECIMAL_ROUNDING = 100000000;
let errored = false;
let typing = false;
let lastCalculationAnswer = 0;
let sequenceArray = [];

for (let i = 0; i < calculatorButtons.length; i++) {
    let button = calculatorButtons[i];
    if (!(isNaN(button.innerHTML))) {
        button.setAttribute("id", button.innerHTML);
        button.setAttribute("onclick", "inputNumber(" + button.innerHTML + ")");
    }
}

function calculate() {
    buttonPressCSS('calculateButton');

    sequenceArray = calculateArray(sequenceArray);
    if (sequenceArray) {
        updateDisplay();
    } 
}

function calculateArray(array) {
    if (lastElementIsOpperand() || errored) {
        invalidStatement();
        return false;
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i] == "ANS") {
            array[i] = lastCalculationAnswer;

            let behind = parseFloat(array[i-1]);
            let front = parseFloat(array[i+1]);

            if (!isNaN(front)) {
                array.splice(i+1, 0, 'x');
            }

            if (!isNaN(behind)) {
                array.splice(i, 0, 'x');
            }
        }
    }

    for (let i = 0; i < array.length; i++) { //BRACKETS
        if (array[i] == "(") {
            let startHadMinus = false;

            if (!isNaN(array[i-1])) {
                array.splice(i, 0, 'x');
                i++;
            }

            if (array[i-1] == "-") {
                array.splice(i-1, 1);
                startHadMinus = true;
                i--;
            }

            for (let x = i+1; x < array.length; x++) {
                if (array[x] == "(") {
                    array = jBackward(array, i);
                    break;
                } else if (array[x] == ")") {
                    array = jForward(array, i);
                    break;
                }
            }

            if (startHadMinus) { //EDGE CASE FOR x-(y)
                array[i] = "-" + array[i];
                if (array[i].startsWith("--")) {
                    array[i] = array[i].substring(2, array[i].length);
                    array.splice(i, 0, "+");
                }
            }
        }
    }

    function jBackward(array, i) {
        for (let j = array.length; j > 0; j--) {
            if (j < i) {
                calculatorError("Bracket error");
                return false;
            }

            if (array[j] == ")") {
                let tempArr = array.slice(i+1, j);
                array.splice(i, j-i+1, calculateArray(tempArr)[0]);
                break;
            }
        }
        return array;
    }

    function jForward(array, i) {
        for (let j = i+1; j < array.length; j++) {
            if (array[j] == undefined) {
                calculatorError("Bracket error");
                return false;
            }

            if (array[j] == ")") {
                let tempArr = array.slice(i+1, j);
                array.splice(i, j-i+1, calculateArray(tempArr)[0]);
                break;
            }
        }
        return array;
    }

    for (let i = 0; i < array.length; i++) { //EXPONENTS
        if (array[i] == "^" || array[i] == "√") {

            let behind = parseFloat(array[i-1]);
            let front = parseFloat(array[i+1]);
            let newInt;

            if (array[i] == "^") {
                newInt = behind ** front;
                array.splice(i-1, 3, newInt);
                i = 0;
            } else {
                if (front < 0) {
                    calculatorError("Radicand can't be negative");
                    return false;
                }
                newInt = Math.sqrt(front);

                if (!isNaN(behind)) {
                    newInt *= behind;
                    array.splice(i--, 1);
                }

                array.splice(i, 2, newInt);
                i = 0;
            }
        }
    }

    for (let i = 0; i < array.length; i++) { //MULTIPLY + DIVIDE
        if (array[i] == "x" || array[i] == "/") {

            let newInt;
            let behind = parseFloat(array[i-1]);
            let front = parseFloat(array[i+1]);
            
            if (array[i] == "x") {
                newInt = behind * front;
            } else {
                if (front == 0) {
                    calculatorError("Can't divide by 0");
                    return false;
                }
                newInt = behind / front;
            }

            array.splice(i-1, 3, newInt);
            i = 0;
        }
    }

    for (let i = 0; i < array.length; i++) { //ADD + SUBTRACT
        if (array[i] == "+" || array[i].toString().search(/[-]/) != -1)  {

            let newInt;
            let behind = parseFloat(array[i-1]);
            let front = parseFloat(array[i+1]);

            if (array[i] == "+") {
                newInt = behind + front;
            } else if (i != 0) {
                array.splice(i, 0, "+");
                front = parseFloat(array[i+1]);
                newInt = behind + front;
            } else {
                continue;
            }
            
            array.splice(i-1, 3, newInt);
            i = 0;
        }
    }

    if (isNaN(array[0])) {
        calculatorError("Error");
        return false;
    } else {
        array[0] = lastCalculationAnswer = (Math.round(array[0] * DECIMAL_ROUNDING) / DECIMAL_ROUNDING).toString();
    }

    return array;
}

function openBracket() {
    buttonPressCSS("(");
    checkErrored();
    sequenceArray.push("(");
    updateDisplay();
}

function closeBracket() {
    checkErrored();
    sequenceArray.push(")");
    buttonPressCSS(")")
    updateDisplay();
}

function squareroot() {
    buttonPressCSS('rootButton');
    checkErrored();
    if (lastArrayElement() != "√") {
        sequenceArray.push("√");
    }
    updateDisplay();
}

function calculatorError(message) {
    errored = true;
    displayElement.innerText = message;
}

function checkErrored() {
    if (errored) {
        errored = false;
        sequenceArray = [];
        updateDisplay();
    }
}

function decimal() {
    checkErrored();
    if (sequenceArray[0] == undefined || lastArrayElement().toString().search(/[.]/) == -1) {
        inputNumber(".");
    }
}

function backspace() {
    buttonPressCSS('backspaceButton');
    checkErrored();

    let arrayLastIndex = sequenceArray.length-1;

    if (arrayLastIndex == -1) {
        return;
    }

    if (lastElementIsOpperand() || lastArrayElement() == "ANS") {
        sequenceArray.pop();
    } else {
        sequenceArray[arrayLastIndex] = sequenceArray[arrayLastIndex].toString().substring(0, sequenceArray[arrayLastIndex].length-1);
    }

    if (lastArrayElement() == "") {
        sequenceArray.pop();
    }

    updateDisplay();
}

function lastElementIsOpperand() {
    let last = lastArrayElement();
    return last == "x" || last == "-" || last == "+" || last == "/" || last == "^" ? true : false;
}

function Ans() {
    checkErrored();
    sequenceArray.push("ANS");
    buttonPressCSS('answerButton');
    updateDisplay();
}

function inputNumber(number) {
    checkErrored();
    if (lastArrayElement() == undefined) {
        sequenceArray[0] = number;
    } else if ((lastElementIsOpperand() && lastArrayElement() != "-") || lastArrayElement() == "√" || lastArrayElement() == "(" || lastArrayElement == ")") {
        sequenceArray.push(number);
    } else {
        sequenceArray[sequenceArray.length-1] += "" + number;
    }

    updateDisplay();
    buttonPressCSS(number);
}

function inputOpperand(input) {
    buttonPressCSS(input);
    if (!endsWithNum() || errored) {
        return;
    }
    checkErrored();
    sequenceArray.push(input);
    updateDisplay();
}

function minus() {
    buttonPressCSS('-');
    checkErrored();
    try {
        if (lastArrayElement().toString()[lastArrayElement().length-1] == "-") {
            return;
        }
    } catch(e) {}

    sequenceArray.push("-");
    updateDisplay();
}

function lastArrayElement() {
    return sequenceArray[sequenceArray.length-1];
}

function endsWithNum() {
    if (lastArrayElement() == "ANS" || lastArrayElement() == ")") {
        return true;
    }

    return isNaN(lastArrayElement()) ? false : true
}

function clearDisplay() {
    sequenceArray = [];
    updateDisplay();
    buttonPressCSS('clearButton');
}

function updateDisplay() {
    displayElement.innerText = "";
    for (let i = 0; i < sequenceArray.length; i++) {
        displayElement.innerText += sequenceArray[i];
    }

    console.log(JSON.stringify(sequenceArray).replaceAll("\"", "'"));
}

//side options

for (let i = 0; i < inputs.length; i++) {
    inputs[i].onfocus = () => {
        typing = true;
    }

    inputs[i].onblur = () => {
        typing = false;
        updateOptions();
    }
}

function updateOptions() {
    updateDecimalRounding();
}

function updateDecimalRounding() {
    let decimalInt = decimalElement.value;
    DECIMAL_ROUNDING = "1";

    if (decimalInt < 0) {
        decimalInt = 0;
        decimalElement.value = decimalInt;
    } else if (decimalInt > 16) {
        decimalInt = 16;
        decimalElement.value = decimalInt;
    } else if (decimalInt % 1 != 0) {
        decimalInt = decimalInt.substring(0, decimalInt.indexOf("."));
        decimalElement.value = decimalInt;
    }

    for (let i = 0; i < decimalInt; i++) {
        DECIMAL_ROUNDING += "0";
    }
}

//random stuff

function buttonPressCSS(id) {
    const element = document.getElementById(id);
    element.classList.add('buttonActivePsuedoClass');
    setTimeout(() => {
        element.classList.remove('buttonActivePsuedoClass');
    }, 100);
}

function invalidStatement() {
    displayElement.style.color = "red";
    setTimeout(() => {
        displayElement.style.color = "black"; 
    }, 300);
}