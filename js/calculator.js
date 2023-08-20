const calculatorButtons = document.getElementsByClassName("calculatorButton");
const displayElement = document.getElementById("displayText");
const decimalElement = document.getElementById("decimalPlacesInput");
const inputs = document.getElementsByTagName("input");

let DECIMAL_ROUNDING = 100000000;
let currentNumHasDecimal = false;
let errored = false;
let typing = false;
let lastCalculationAnswer = 0;

for (let i = 0; i < calculatorButtons.length; i++) {
    let button = calculatorButtons[i];
    if (!(isNaN(button.innerHTML))) {
        button.setAttribute("id", button.innerHTML);
        button.setAttribute("onclick", "inputNumber(" + button.innerHTML + ")");
    }
}

let calculationArray = [];

function calculate() {
    calculationArray = calculateArray(calculationArray);
    updateDisplay();
}

function calculateArray(array) {
    if (!(endsWithNum())) {
        invalidStatement();
        return;
    }

    let loopLength = array.length;

    for (let i = 0; i < loopLength; i++) {
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

    for (let i = 0; i < loopLength; i++) {
        if (array[i] == "(") { 
            for (let j = loopLength-1; j > 0; j--) {
                console.log("e");
                if (i < 0) {
                    calculatorError("Bracket error");
                    return;
                }
            }
        }
    }

    loopLength = array.length;

    for (let i = 0; i < loopLength; i++) { //EXPONENTS
        if (array[i] == "^" || array[i] == "√") {

            let behind = parseFloat(array[i-1]);
            let front = parseFloat(array[i+1]);

            if (array[i] == "^") {
                newInt = behind ** front;

                array = ArrayInsertNewInt(array, i, newInt);
                loopLength = array.length;
                i = 0;
            } else {
                if (front < 0) {
                    calculatorError("Radicand can't be negative");
                    return;
                }
                newInt = Math.sqrt(front);

                if (!isNaN(behind)) {
                    newInt *= behind;
                    array[i-1] = undefined;
                }

                array[i] = newInt;
                array[i+1] = undefined;
                array = array.filter(num => num != undefined);

                loopLength = array.length;
                i = 0;
            }
        }
    }

    for (let i = 0; i < loopLength; i++) { //MULTIPLY + DIVIDE
        if (array[i] == "x" || array[i] == "/") {

            let behind = parseFloat(array[i-1]);
            let front = parseFloat(array[i+1]);
            
            if (array[i] == "x") {
                newInt = behind * front;
            } else {
                if (front == 0) {
                    calculatorError("Can't divide by 0");
                    return;
                }
                newInt = behind / front;
            }

            array = ArrayInsertNewInt(array, i, newInt);
            loopLength = array.length;
            i = 0;
        }
    }

    for (let i = 0; i < loopLength; i++) { //ADD + SUBTRACT
        if (array[i] == "+" || array[i] == "-") {

            let newInt;
            let behind = parseFloat(array[i-1]);
            let front = parseFloat(array[i+1]);

            if (array[i] == "+") {
                newInt = behind + front;
            } else {
                newInt = behind - front;
            }

            array = ArrayInsertNewInt(array, i, newInt);
            loopLength = array.length;
            i = 0;
        }
    }

    if (isNaN(array[0])) {
        displayElement.innerText = "Error";
        errored = true;
    } else {
        array[0] = lastCalculationAnswer = (Math.round(array[0] * DECIMAL_ROUNDING) / DECIMAL_ROUNDING).toString();
    }

    lastCalculationAnswer.includes(".") ? currentNumHasDecimal = true : currentNumHasDecimal = false;
    buttonPressCSS('calculateButton');

    return array;
}

function ArrayInsertNewInt(array, index, newNumber) {
    array[index] = newNumber;
    array[index-1] = undefined;
    array[index+1] = undefined;
    return array.filter(num => num != undefined);
}

function openBracket() {
    calculationArray.push("(");
    updateDisplay();
}

function closeBracket() {
    calculationArray.push(")");
    updateDisplay();
}

function lastArrayElement() {
    return calculationArray[calculationArray.length-1];
}

function endsWithNum() {
    if (calculationArray[calculationArray.length-1] == "ANS") {
        return true;
    }

    return isNaN(lastArrayElement()) ? false : true
}

function clearDisplay() {
    calculationArray = [];
    updateDisplay();
    currentNumHasDecimal = false;
    buttonPressCSS('clearButton');
}

function updateDisplay() {
    displayElement.innerText = "";
    for (let i = 0; i < calculationArray.length; i++) {
        displayElement.innerText += calculationArray[i];
    }

    console.log(calculationArray);
}

function squareroot() {
    checkErrored();
    if (lastArrayElement() != "√") {
        calculationArray.push("√");
    }
    updateDisplay();
    buttonPressCSS('rootButton');
}

function calculatorError(message) {
    errored = true;
    displayElement.innerText = message;
}

function checkErrored() {
    if (errored) {
        displayElement.innerText = "";
        errored = false;
    }
}

function decimal() {
    checkErrored();
    if (!currentNumHasDecimal) {
        inputNumber(".")
        currentNumHasDecimal = true;
    }
    
    buttonPressCSS('decimalButton');
}

function backspace() {
    checkErrored();

    let arrayLastIndex = calculationArray.length-1;

    if (calculationArray.length === 0) {
        return;
    }

    if (lastElementIsOpperand()) {
        calculationArray.pop();
    } else if (lastArrayElement() == "ANS" || lastElementIsOpperand()) {
        calculationArray.pop();
    } else {
        calculationArray[arrayLastIndex] = calculationArray[arrayLastIndex].toString().substring(0, calculationArray[arrayLastIndex].length-1);
    }

    if (lastArrayElement() == "") {
        calculationArray.pop();
    }

    updateDisplay();
    buttonPressCSS('backspaceButton');
}

function lastElementIsOpperand() {
    let last = lastArrayElement();
    return last == "x" || last == "-" || last == "+" || last == "/" || last == "^" ? true : false;
}

function Ans() {
    checkErrored();
    calculationArray.push("ANS");
    buttonPressCSS('answerButton');
    updateDisplay();
}

function inputNumber(number) {
    if (lastArrayElement() == undefined) {
        calculationArray[0] = number;
    } else if (lastElementIsOpperand() || lastArrayElement() == "√" || lastArrayElement() == "(" || lastArrayElement == ")") {
        calculationArray.push(number);
    } else {
        calculationArray[calculationArray.length-1] += "" + number;
    }

    updateDisplay();
    buttonPressCSS(number);
}

function inputOpperand(input) {
    if (!endsWithNum()) {
        return;
    }

    checkErrored();
    calculationArray.push(input);
    currentNumHasDecimal = false;
    buttonPressCSS(input);
    updateDisplay();
}

//side options

function updateOptions() {
    updateDecimalRounding();
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

for (let i = 0; i < inputs.length; i++) {
    inputs[i].onfocus = () => {
        typing = true;
    }

    inputs[i].onblur = () => {
        typing = false;
        updateOptions();
    }
}