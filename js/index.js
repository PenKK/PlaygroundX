if (localStorage.getItem("HarrHarrTime") == null) {
    console.log("Harr harr initialized");
    localStorage.setItem("HarrHarrTime", "0");
}

if ((localStorage.getItem("MASTER_GUESSER") == "true") && 
    (localStorage.getItem("SWEEPER_OR_SWEEPED") == "true") && 
    (localStorage.getItem("TIC_TAC_TOE_LOSER") == "true") && 
    (localStorage.getItem("2048_AMBASSADOR") == "true") &&
    (localStorage.getItem("2048_COMPLETIONIST") == "true") &&
    (localStorage.getItem("GRANDMASTER_GUESSER") == "true")) {
    document.getElementById("achievementsButton").style.backgroundSize = "300%";
    rainbowAnimationEl(document.getElementById("achievementsButton"), 4);
}

//Page transfering terrible method dont ask thank idc anymore

gg = () => {
    setTimeout(() => {
        window.location.href = "guessing-game.html";
    }, pageChangeDelay);	
}

rps = () => {
    setTimeout(() => {
        window.location.href = "rock-paper-scissors.html";
    }, pageChangeDelay);	
}

ttt = () => {
    setTimeout(() => {
        window.location.href = "tic-tac-toe.html";
    }, pageChangeDelay);	
}

tft = () => {
    setTimeout(() => {
        window.location.href = "2048.html";
    }, pageChangeDelay);
}

ach = () => {
    setTimeout(() => {
        window.location.href = "achievements.html";
    }, pageChangeDelay);
}

cont = () => {
    setTimeout(() => {
        window.location.href = "controls.html";
    }, pageChangeDelay);
}

quad = () => {
    setTimeout(() => {
        window.location.href = "quadratic-calculator.html";
    }, pageChangeDelay);
}

calc = () => {
    setTimeout(() => {
        window.location.href = "calculator.html"
    }, pageChangeDelay);
}

graph = () => {
    setTimeout(() => {
        window.location.href = "graphing-tool.html"
    }, pageChangeDelay);
}

train = () => {
    setTimeout(() => {
        window.location.href = "ear-trainer.html"
    }, pageChangeDelay);
}