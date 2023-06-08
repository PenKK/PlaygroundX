let calculatorButtons = document.getElementsByClassName("calculatorButton");
let displayElement = document.getElementById("displayText");
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
    if (isNaN(displayMessage[displayMessage.length-1])) {
        return true;
    }
    return false;
}

function calculate() {

    if (!(endsWithNum())) {
        return;
    }

    let displayArray = displayMessage.split(" ");

    for (let i = 0; i < displayArray.length; i++) {

        if (isNaN((displayArray[i]))) {
            
            let newInt;
            let behind = parseFloat(displayArray[i-1]);
            let front = parseFloat(displayArray[i+1]);
    
            switch(displayArray[i]) {
                case "+":
                    newInt =  behind + front;
                    break;
                case "-":
                    newInt = behind - front;
                    break;
                case "x":
                    newInt = behind * front;
                    break;
                case "/":

                    if (front == 0) {
                        calculatorError("Can't divide by 0");
                        return;
                    }
                    newInt = behind / front;
                    break;
            }

            displayArray[i] = newInt;
            displayArray[i-1] = undefined;
            displayArray[i+1] = undefined;

            i = 0;
            displayArray = displayArray.filter(num => num != undefined);
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

function endsWithNum() {
    if (isNaN(displayElement.innerText[displayElement.innerText.length-1])) {
        return false;
    }
    return true;
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

function inputNumber(input) {

    checkErrored();
    displayMessage = displayMessage.concat(input.toString());
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