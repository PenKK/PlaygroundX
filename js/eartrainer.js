const noteSelectionButtonDiv = document.getElementById("noteSelectionButton");
const noteSelectionMenu = document.getElementById("noteSelection");
const noteCheckBoxes = document.getElementsByClassName('checkBoxOptions');
const guessInput = document.getElementById('guessInput');
const enterButton = document.getElementById('enterButton');
const nextNoteButton = document.getElementById('nextNote');
const noteButtons = document.querySelectorAll('.gameButton');
const correctDisplay = document.getElementById('correctScore');
const incorrectDisplay = document.getElementById('incorrectScore');
const percentageDisplay = document.getElementById('scorePercentageText');

let C;
let D;
let E;
let F;
let G;
let A;
let B;
let CC;

let selectedNotes;
let noteToPlay;
let correctlyAnswered = false;

let answer = -1;
let correct = 0;
let incorrect = 0;
let percentage = 0;

initializeNotes();

noteSelectionButtonDiv.onclick = () => {
    selectionDisplay();
}

nextNoteButton.onclick = () => {
    correctAnswer();
}

listenButton.onclick = () => {
    noteToPlay.play();
}

function selectionDisplay() {
    if (!noteSelectionMenu.checkVisibility()) {
        noteSelectionMenu.removeAttribute("hidden");
    } else {
        noteSelectionMenu.setAttribute("hidden", "");
        updateNotes();
    }
}

function correctAnswer() {
    if (correctlyAnswered) {
        nextNoteButton.style.visibility = "hidden";
        generateNote();
        noteToPlay.play();
        correctlyAnswered = false;
    }
}

function checkAnswer(input) {
    if (input == answer && !correctlyAnswered) {
        nextNoteButton.style.visibility = "visible";
        correctlyAnswered = true;
        correct = parseInt(correctDisplay.innerHTML) + 1;
        correctDisplay.innerHTML = correct;
    } else {
        noteColorChange('red');
        if (!correctlyAnswered) {
            incorrect = parseInt(incorrectDisplay.innerHTML) + 1;
            incorrectDisplay.innerHTML = incorrect;
        }
    }

    percentage = correct/(incorrect+correct) * 100;
    percentageDisplay.innerHTML = percentage.toFixed(2) + '%';

}

function noteColorChange(color) {
    noteButtons.forEach(element => {
        element.style.color = color;
    });

    setTimeout(() => {
        noteButtons.forEach(element => {
            element.style.color = 'white';
        });
    }, 500);
}

function initializeNotes() {
    updateNotes();
}

function updateNotes() {
    if (noteCheckBoxes[0].checked) { //Trombone  Notes
        C  = new Audio('https://drive.google.com/uc?export=download&id=1FSiOuIe878CeYK4ahqmPnZpRAmX7rq5_');
        D  = new Audio('https://drive.google.com/uc?export=download&id=1LYnyYCBiv9twQA6BsX2_u9pwpmI89tDP');
        E  = new Audio('https://drive.google.com/uc?export=download&id=1JAcT8gNEDJSImk2DJj8w_4nBgEsMzoqW');
        F  = new Audio('https://drive.google.com/uc?export=download&id=1R9wq0x8gRX9w1MveWAzr5KOMiMPwvReu');
        G  = new Audio('https://drive.google.com/uc?export=download&id=1RTC1-pAceRv1sFNe3PAZ4Vu0PMHWoaPp');
        A  = new Audio('https://drive.google.com/uc?export=download&id=1XSanymobasi7z9-Jupdl8Dic7HmywhCI');
        B  = new Audio('https://drive.google.com/uc?export=download&id=10q9KzPp2jv8_9VqFDG3Z89-ownOH8pRB');
    } else { //TODO Piano notes
        C  = new Audio();
        D  = new Audio();
        E  = new Audio();
        F  = new Audio();
        G  = new Audio();
        A  = new Audio();
        B  = new Audio();
    }

    selectedNotes = [[],[]];

    if (noteCheckBoxes[1].checked) {selectedNotes[0].push(C); selectedNotes[1].push("C")}
    if (noteCheckBoxes[2].checked) {selectedNotes[0].push(D); selectedNotes[1].push("D")}
    if (noteCheckBoxes[3].checked) {selectedNotes[0].push(E); selectedNotes[1].push("E")}
    if (noteCheckBoxes[4].checked) {selectedNotes[0].push(F); selectedNotes[1].push("F")}
    if (noteCheckBoxes[5].checked) {selectedNotes[0].push(G); selectedNotes[1].push("G")}
    if (noteCheckBoxes[6].checked) {selectedNotes[0].push(A); selectedNotes[1].push("A")}
    if (noteCheckBoxes[7].checked) {selectedNotes[0].push(B); selectedNotes[1].push("B")}

    generateNote();
}

function generateNote() {
    const noteInt = Math.floor(Math.random()*selectedNotes[0].length);
    noteToPlay = selectedNotes[0][noteInt];
    answer = selectedNotes[1][noteInt];
}