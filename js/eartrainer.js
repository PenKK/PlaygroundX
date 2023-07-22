const noteSelectionButtonDiv = document.getElementById("noteSelectionButton");
const noteSelectionMenu = document.getElementById("noteSelection");
const noteCheckBoxes = document.getElementsByClassName('checkBoxOptions');
const guessInput = document.getElementById('guessInput');

noteSelectionButtonDiv.onclick = () => {
    if (!noteSelectionMenu.checkVisibility()) {
        noteSelectionMenu.removeAttribute("hidden");
    } else {
        noteSelectionMenu.setAttribute("hidden", "");
        loadNotes();
    }
}

guessInput.addEventListener('input', () => {
    guessInput.style.width = guessInput.value.length + "ch";
})

function initializeNotes() {
    const a = "hi";
}

function loadNotes() {
    if (noteCheckBoxes[1].checked === true) {
        
    }
}