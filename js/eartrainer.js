const noteSelectionButtonDiv = document.getElementById("noteSelectionButton");
const noteSelectionMenu = document.getElementById("noteSelection");

noteSelectionButtonDiv.onclick = () => {
    if (!noteSelectionMenu.checkVisibility()) {
        noteSelectionMenu.removeAttribute("hidden");
    } else {
        noteSelectionMenu.setAttribute("hidden", "");
    }
}