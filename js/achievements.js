var onRGB = "rgb(97, 209, 53)";
var offRGB = "rgb(224, 224, 224)";

window.onload = function() {
    if (localStorage.getItem("MASTER_GUESSER") == "true") {
        ElementId("masterGuesser").style.backgroundColor = onRGB;
    }
    
    if (localStorage.getItem("SWEEPER_OR_SWEEPED") == "true") {
        ElementId("sweeperSweeped").style.backgroundColor = onRGB;
    }

}