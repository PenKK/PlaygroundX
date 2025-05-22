rainbowAnimationEl(document.getElementById("customBeeper"), 10);

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

function goToPage(page) {
    setTimeout(() => {
        window.location.href = page;
    }, pageChangeDelay);	
}

gg = () => {
    goToPage("guessing-game.html");
}

rps = () => {
    goToPage("rock-paper-scissors.html");
}

ttt = () => {
    goToPage("tic-tac-toe.html");
}

tft = () => {
    goToPage("2048.html");
}

ach = () => {
    goToPage("achievements.html");
}

cont = () => {
    goToPage("controls.html");
}

quad = () => {
    goToPage("quadratic-calculator.html");
}

calc = () => {
    goToPage("calculator.html");
}

graph = () => {
    goToPage("graphing-tool.html");
}

train = () => {
    goToPage("ear-trainer.html");
}

beep = () => {
    goToPage("custom-beeper.html");
}