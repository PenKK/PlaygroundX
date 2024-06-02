const noteSelectionButtonDiv = document.getElementById("noteSelectionButton");
const noteSelectionMenu = document.getElementById("noteSelection");
const noteCheckBoxes = document.getElementsByClassName('checkBoxOptions');
const listenButton = document.getElementById('listenButton');
const noteButtons = document.querySelectorAll('.gameButton');
const correctDisplay = document.getElementById('correctScore');
const incorrectDisplay = document.getElementById('incorrectScore');
const percentageDisplay = document.getElementById('scorePercentageText');
const audioElements = document.getElementsByClassName("audios");
const pianoContainer = document.getElementById('pianoContainer');

class Note {
    constructor(key, audioElement) {
        this.key = key;
        this.audio = audioElement;
        this.enabled = true;
        this.backgroundColor = key.includes('b') ? "black" : "white";
        this.incorrect = 0;
    }

    play() {
        this.audio.currentTime = 0;
        this.audio.play();
    }
}

let answer = -1;
const notes = [];
const stats = {
    correct: 0,
    incorrect: 0,
    percentage: 0
}

for (let i = 0; i < audioElements.length; i++) {
    notes.push(new Note(audioElements[i].innerText, audioElements[i]))
}

randomizeAnswer();

function nextRound() {
    listenButton.innerHTML = "Play Note";
    pianoContainer.dataset.canClick = true;
    randomizeAnswer();
    answer.play();
}

function clickKey(key) {
    const note = notes[notes.findIndex(note => note.key === key)];

    if (noteSelectionButtonDiv.dataset.selectingNotes == "true") {
        note.enabled = !note.enabled;
        toggleVisibility(key);
        return;
    }

    if (pianoContainer.dataset.canClick == "false")
        return;

    if (!note.enabled)
        return;

    if (key === answer.key) {
        stats.correct++;
        pianoContainer.dataset.canClick = false;
        listenButton.innerText = "Next note";
        tempColorKey(key, "green");
    } else {
        stats.incorrect++;
        note.incorrect++;
        tempColorKey(key, "red");
    }

    updateScore();
}

function tempColorKey(id, color) {
    const element = document.getElementById(id);

    element.style.backgroundColor = color;
    setTimeout(() => {
        element.style.backgroundColor = notes[notes.findIndex(note => note.key === id)].backgroundColor;
    }, 750);
}

function updateScore() {
    correctDisplay.innerText = stats.correct;
    incorrectDisplay.innerText = stats.incorrect;
    percentageDisplay.innerText = `${Math.round(stats.correct/(stats.correct+stats.incorrect)*100)}%`;
}

function toggleVisibility(id) {
    const element = document.getElementById(id);
    const computerStyle = window.getComputedStyle(element);
    element.style.color = computerStyle.color.replace(/[^,]+(?=\))/, notes[notes.findIndex(note => note.key === id)].enabled ? 0.99 : 0.5);
}

noteSelectionButtonDiv.onclick = () => {
    if (noteSelectionButtonDiv.dataset.selectingNotes == "true") {
        noteSelectionButtonDiv.dataset.selectingNotes = false;
        noteSelectionButtonDiv.classList.remove("pressed");
        randomizeAnswer();
    } else {
        noteSelectionButtonDiv.dataset.selectingNotes = true;
        noteSelectionButtonDiv.classList.add("pressed");
    }

    if (notes.filter( note => note.enabled === true).length == 0) {
        noteSelectionButtonDiv.dataset.selectingNotes = true;
        noteSelectionButtonDiv.classList.add("pressed");
    }
}

listenButton.onclick = () => {
    if (noteSelectionButtonDiv.dataset.selectingNotes == "true")
        return;

    if (pianoContainer.dataset.canClick == "false") {
        nextRound();
    } else 
    if (noteSelectionButtonDiv.dataset.selectingNotes == "false"){
        answer.play();
    }
}

function randomizeAnswer() {
    const enabledNotes = notes.filter( note => note.enabled === true);
    answer = enabledNotes[Math.floor(Math.random() * enabledNotes.length)];
}

function playScale() {
    for (let i = 0; i < notes.length; i++) {
        setTimeout(() => {
            notes[i].play();
        }, i * 250);
    }
}