const onRGB = "rgb(97, 209, 53)";
const offRGB = "rgb(224, 224, 224)";
const hidden = document.getElementsByClassName("secretAchievement");
const allAchievements = document.getElementsByClassName("achievementBox")

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

    if (localStorage.getItem("2048_AMBASSADOR") == "true") {
        ElementId("2048ambassador").parentElement.style.backgroundColor = onRGB;
    }

    if ((localStorage.getItem("MASTER_GUESSER") == "true") && (localStorage.getItem("SWEEPER_OR_SWEEPED") == "true") && (localStorage.getItem("TIC_TAC_TOE_LOSER") == "true") && (localStorage.getItem("2048_AMBASSADOR") == "true")) {
        rainbowAnimation();
        for (let i = 0; i < hidden.length; i++) {
            hidden[i].style.visibility = "visible";
        }
    }

    if (localStorage.getItem("GRANDMASTER_GUESSER") == "true") {
        ElementId("grandmasterGuesser").parentElement.style.backgroundColor = onRGB;
        
    }

    if (localStorage.getItem("2048_COMPLETIONIST") == "true") {
        ElementId("2048completionist").parentElement.style.backgroundColor = onRGB;
    }

    if ((localStorage.getItem("2048_COMPLETIONIST") == "true") && (localStorage.getItem("GRANDMASTER_GUESSER") == "true")) {
        ElementId("headerDiv").innerHTML = "ACHIEVEMENTS";
        ElementId("pText").innerHTML = "Congratulations on completing all achievements!";
    }
}