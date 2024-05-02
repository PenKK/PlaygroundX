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
const audioElements = document.getElementsByClassName("audios");

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

function playScale() {
    for(let i = 0; i < 8; i++) {

        setTimeout(() => {
            audioElements[i + 8].play();
        }, i * 500);
    }
}

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
    noteCheckBoxes[0].checked = false;
    updateNotes();

    // C.addEventListener('error', function(e) {
    //     var noSourcesLoaded = (this.networkState===HTMLMediaElement.NETWORK_NO_SOURCE);
    //     if(noSourcesLoaded) alert("Audio failed to load, audio may not work");
    // }, true);

}

function updateNotes() {
    if (noteCheckBoxes[0].checked) { //Trombone  Notes
        C  = audioElements[0];
        D  = audioElements[1];
        F  = audioElements[2];
        E  = audioElements[3];
        G  = audioElements[4];
        A  = audioElements[5];
        B  = audioElements[6];
    } else { //TODO Piano notes
        C  = audioElements[8];
        D  = audioElements[9];
        F  = audioElements[10];
        E  = audioElements[11];
        G  = audioElements[12];
        A  = audioElements[13];
        B  = audioElements[14];
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