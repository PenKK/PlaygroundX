let calculatorButtons = document.getElementsByClassName("calculatorButton");
let displayElement = document.getElementById("displayText");
const decimalRounding = 100000000000;

for (let i = 0; i < calculatorButtons.length; i++) {
    let button = calculatorButtons[i];
    if (!(isNaN(button.innerHTML))) {
        button.setAttribute("id", button.innerHTML);
        button.setAttribute("onclick", "c" + button.innerHTML + "()");
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
    } else {
        displayMessage = (Math.round(displayArray[0] * decimalRounding) / decimalRounding).toString();
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
    displayMessage = message;
    displayElement.innerText = displayMessage;
}

function add() {
    if (checkLastIndexForNonInteger()) {
        return;
    }
    displayMessage = displayMessage.concat(" + ");
    updateDisplay();
}

function subtract() {
    if (checkLastIndexForNonInteger()) {
        return;
    }
    displayMessage = displayMessage.concat(" - ");
    updateDisplay();
}

function multiply() {
    if (checkLastIndexForNonInteger()) {
        return;
    }
    displayMessage = displayMessage.concat(" x ");
    updateDisplay();
}

function divide() {
    if (checkLastIndexForNonInteger()) {
        return;
    }
    displayMessage = displayMessage.concat(" / ");
    updateDisplay();
}

function c1() {
    displayMessage = displayMessage.concat("1");
    updateDisplay();
}

function c2() {
    displayMessage = displayMessage.concat("2");
    updateDisplay();
}

function c3() {
    displayMessage = displayMessage.concat("3");
    updateDisplay();
}

function c4() {
    displayMessage = displayMessage.concat("4");
    updateDisplay();
}

function c5() {
    displayMessage = displayMessage.concat("5");
    updateDisplay();
}

function c6() {
    displayMessage = displayMessage.concat("6");
    updateDisplay();
}

function c7() {
    displayMessage = displayMessage.concat("7");
    updateDisplay();
}

function c8() {
    displayMessage = displayMessage.concat("8");
    updateDisplay();
}

function c9() {
    displayMessage = displayMessage.concat("9");
    updateDisplay();
}

function c0() {
    displayMessage = displayMessage.concat("0");
    updateDisplay();
}
