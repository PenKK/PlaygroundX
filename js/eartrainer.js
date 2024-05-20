const noteSelectionButtonDiv = document.getElementById("noteSelectionButton");
const noteSelectionMenu = document.getElementById("noteSelection");
const noteCheckBoxes = document.getElementsByClassName('checkBoxOptions');
const guessInput = document.getElementById('guessInput');
const enterButton = document.getElementById('enterButton');
const listenButton = document.getElementById('listenButton');
const noteButtons = document.querySelectorAll('.gameButton');
const correctDisplay = document.getElementById('correctScore');
const incorrectDisplay = document.getElementById('incorrectScore');
const percentageDisplay = document.getElementById('scorePercentageText');
const audioElements = document.getElementsByClassName("audios");

class Note {
    constructor(key, audioElement) {
        this.key = key;
        this.audio = audioElement;
        this.enabled = true;
    }

    play() {
        this.audio.currentTime = 0;
        this.audio.play();
    }
}

const notes = [];
let answer = -1;

const states = {
    selectingNotes: false,
    canAnswer: true,
    wonRound: false
}


let correct = 0;
let incorrect = 0;
let percentage = 0;

// let noteToPlay;
// let correctlyAnswered = false;

for (let i = 0; i < audioElements.length; i++) {
    notes.push(new Note(audioElements[i].innerText, audioElements[i]))
}

randomizeAnswer();

function nextRound() {
    listenButton.innerHTML = "Play Note";
    states.wonRound = false;
    randomizeAnswer();
    answer.play();
}

function clickKey(key) {

    if (states.selectingNotes) {
        const keyIndex = notes.findIndex(note => note.key === key);
        notes[keyIndex].enabled = !notes[keyIndex].enabled;
        toggleVisibility(key);
        return;
    }

    if (states.wonRound)
        return;

    if (key === answer.key) {
        correct++;
        states.wonRound = true;
        listenButton.innerText = "Next note";
    } else {
        incorrect++;
    }

    updateScore();
}

function updateScore() {
    correctDisplay.innerText = correct;
    incorrectDisplay.innerText = incorrect;
    percentageDisplay.innerText = `${Math.round(correct/(correct+incorrect)*100)}%`;
}

function toggleVisibility(id) {
    const element = document.getElementById(id);
    const computerStyle = window.getComputedStyle(element);
    element.style.color = computerStyle.color.replace(/[^,]+(?=\))/, notes[notes.findIndex(note => note.key === id)].enabled ? 0.99 : 0.5);
}

noteSelectionButtonDiv.onclick = () => {
    states.selectingNotes = !states.selectingNotes;
    if (!states.selectingNotes)
        randomizeAnswer();
}

listenButton.onclick = () => {
    if (states.wonRound) {
        nextRound();
    } else {
        answer.play();
    }
}

function randomizeAnswer() {
    const enabledNotes = notes.filter( note => note.enabled === true);
    answer = enabledNotes[Math.floor(Math.random() * enabledNotes.length)];
}