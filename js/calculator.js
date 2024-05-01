const calculatorButtons = document.getElementsByClassName("calculatorButton");
const displayElement = document.getElementById("displayText");
const decimalElement = document.getElementById("decimalPlacesInput");
const inputs = document.getElementsByTagName("input");

let DECIMAL_ROUNDING = 100000000;
let errored = false;
let typing = false;
let lastCalculationAnswer = 0;
let sequenceArray = [];
let inverseOn = false;

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
        if (array[i] == "ANS" || array[i] == "π") {
            array[i] = array[i] == "ANS" ? lastCalculationAnswer : Math.PI;

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
            } else if (array[i-1] == "-") {
                array.splice(i-1, 1);
                startHadMinus = true;
                i--;
            }

            for (let x = i+1; x < array.length; x++) {
                if (array[x] == "(") {
                    array = jBackward(array, i);
                    break;
                } else if (array[x] == ")") {
                    if (!isNaN(array[x+1])) {
                        array.splice(x+1, 0, 'x');
                    }
                    array = jForward(array, i);
                    break;
                }
            }

            if (startHadMinus) { //Fix for bracket subtraction
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


    for (let i = 0; i < array.length; i++) {
        const func = (array[i] + "").substring(0,3);

        if (func == "sin" || func == "cos" || func == "tan") {
            
            let behind = parseFloat(array[i-1]);
            let front = parseFloat(array[i+1]);
            let newInt;

            if (!array[i].endsWith(">")) {
                switch(func) {
                    case "sin": 
                        newInt = Math.sin(front);
                        break;
                    case "cos":
                        newInt = Math.cos(front);
                        break;
                    case "tan":
                        newInt = Math.tan(front);
                        break;
                }
            } else {
                switch(func) {
                    case "sin": 
                        newInt = Math.asin(front);
                        break;
                    case "cos":
                        newInt = Math.acos(front);
                        break;
                    case "tan":
                        newInt = Math.atan(front);
                        break;
                }
            }

            if (isNaN(newInt)) {
                calculatorError("Trigonometric error");
                return false;
            }

            array.splice(i, 2, newInt);

            if (!isNaN(behind)) {
                array.splice(i, 0, 'x');
            }
        }
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
        sequenceArray = oldSeqArray;
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

    const lastElement = lastArrayElement();

    if (lastElementIsOpperand() || lastElement == "ANS" || lastElement == "sin" || lastElement == "cos" || lastElement == "tan" || lastElement.toString().endsWith(">")) {
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
    } else if ((lastElementIsOpperand() && lastArrayElement() != "-") || lastArrayElement() == "√" || lastArrayElement() == "(" || 
                 lastArrayElement() == ")" || lastArrayElement() == "ANS" || lastArrayElement() == "π") {
        sequenceArray.push(number);
    } else {
        sequenceArray[sequenceArray.length-1] += "" + number;
    }

    updateDisplay();
    buttonPressCSS(number);
}

function inputConstant(character) {
    checkErrored();
    sequenceArray.push(character);
    updateDisplay();
    restoreOriginalButtons();
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

function inputTrig(buttonIndex, isInverse) {
    checkErrored();
    let trigString;

    switch(buttonIndex) {
        case 4:
            trigString = "sin";
            break;
        case 5:
            trigString = "cos";
            break;
        case 6:
            trigString = "tan";
            break;
    }

    trigString += isInverse ? "<sup>-1</sup>" : "";
    sequenceArray.push(trigString);
    sequenceArray.push("(");
    restoreOriginalButtons();
    updateDisplay();
}

function inverse() {
    if (!calculatorButtons[4].innerHTML.endsWith(">")) {
        inverseOn = true;
        calculatorButtons[4].innerHTML = "sin<sup>-1</sup>";
        calculatorButtons[5].innerHTML = "cos<sup>-1</sup>";
        calculatorButtons[6].innerHTML = "tan<sup>-1</sup>";

        for (let i = 4; i <= 6; i++) {
            calculatorButtons[i].setAttribute("onclick", "inputTrig(" + i + ", true)");
        }
    } else {
        inverseOn = false;
        calculatorButtons[4].innerHTML = "sin";
        calculatorButtons[5].innerHTML = "cos";
        calculatorButtons[6].innerHTML = "tan";

        for (let i = 4; i <= 6; i++) {
            calculatorButtons[i].setAttribute("onclick", "inputTrig(" + i + ", false)");
        }
    }
}

function restoreOriginalButtons() {
    calculatorButtons[4].innerHTML = "2nd";
    calculatorButtons[5].innerHTML = "^";
    calculatorButtons[6].innerHTML = "√";
    calculatorButtons[7].innerHTML = "/";
    calculatorButtons[11].innerHTML = "x";

    calculatorButtons[4].setAttribute("onclick", "second()");
    calculatorButtons[5].setAttribute("onclick", "inputOpperand('^')");
    calculatorButtons[6].setAttribute("onclick", "squareroot()");
    calculatorButtons[7].setAttribute("onclick", "inputOpperand('/')");
    calculatorButtons[11].setAttribute("onclick", "inputOpperand('x')");
}

function second() {
    calculatorButtons[4].innerHTML = "sin";
    calculatorButtons[5].innerHTML = "cos";
    calculatorButtons[6].innerHTML = "tan";
    calculatorButtons[7].innerHTML = "Inv"
    calculatorButtons[11].innerHTML = "π";

    calculatorButtons[7].setAttribute("onclick", "inverse()");
    calculatorButtons[11].setAttribute("onclick", "inputConstant('π')");

    for (let i = 4; i <= 6; i++) {
        calculatorButtons[i].setAttribute("onclick", "inputTrig(" + i + ", false)");
    }
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
    if (lastArrayElement() == "ANS" || lastArrayElement() == ")" || lastArrayElement() == "π") {
        return true;
    }

    return isNaN(lastArrayElement()) ? false : true;
}


function clearDisplay() {
    sequenceArray = [];
    updateDisplay();
    buttonPressCSS('clearButton');
}

function updateDisplay() {
    displayElement.innerHTML = "";
    for (let i = 0; i < sequenceArray.length; i++) {
        displayElement.innerHTML += sequenceArray[i];
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