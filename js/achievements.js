var onRGB = "rgb(97, 209, 53)";
var offRGB = "rgb(224, 224, 224)";

window.onload = () => {
    if (localStorage.getItem("MASTER_GUESSER") == "true") {
        ElementId("masterGuesser").parentElement.style.backgroundColor = onRGB;
    }
    
    if (localStorage.getItem("SWEEPER_OR_SWEEPED") == "true") {
        ElementId("sweeperSweeped").parentElement.style.backgroundColor = onRGB;
    }

    if (localStorage.getItem("TIC_TAC_TOE_LOSER") == "true") {
        ElementId("ticTacLoser").parentElement.style.backgroundColor = onRGB;
    }

    if ((localStorage.getItem("MASTER_GUESSER") == "true") && (localStorage.getItem("SWEEPER_OR_SWEEPED") == "true") && (localStorage.getItem("TIC_TAC_TOE_LOSER") == "true")) {
        rainbowAnimation();
        ElementId("grandmasterGuesser").parentElement.style.visibility = "visible";
    }

    if (localStorage.getItem("GRANDMASTER_GUESSER") == "true") {
        ElementId("grandmasterGuesser").parentElement.style.backgroundColor = onRGB;
        ElementId("headerDiv").innerHTML = "ACHIEVEMENTS";
        ElementId("pText").innerHTML = "Congratulations on completing all achievements!";
    }
}