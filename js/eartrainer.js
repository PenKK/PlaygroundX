const noteSelectionButtonDiv = document.getElementById("noteSelectionButton");
const noteSelectionMenu = document.getElementById("noteSelection");
const noteCheckBoxes = document.getElementsByClassName('checkBoxOptions');
const guessInput = document.getElementById('guessInput');
const enterButton = document.getElementById('enterButton');
const nextNoteButton = document.getElementById('nextNote');

let answer = -1;

noteSelectionButtonDiv.onclick = () => {
    if (!noteSelectionMenu.checkVisibility()) {
        noteSelectionMenu.removeAttribute("hidden");
    } else {
        noteSelectionMenu.setAttribute("hidden", "");
        loadNotes();
    }
}

nextNoteButton.onclick = () => {
    nextNoteButton.style.visibility = "hidden";
}

enterButton.onclick = () => {
    if (guessInput.value.toUpperCase() == answer) {
        nextNoteButton.style.visibility = "visible";
    }
}

function initializeNotes() {
    const a = "hi";
}

function loadNotes() {
    if (noteCheckBoxes[1].checked === true) {
        
    }
}