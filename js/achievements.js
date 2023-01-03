function elementId(id) {
    return document.getElementById(id);
}

var onRGB = "rgb(97, 209, 53)";

window.onload = function() {
    if (localStorage.getItem("masterGuesser") == "true") {
        elementId("masterGuesser").style.backgroundColor = onRGB;
    }
    if (localStorage.getItem("sweeperSweeped") == "true") {
        elementId("sweeperSweeped").style.backgroundColor = onRGB;
    }

}