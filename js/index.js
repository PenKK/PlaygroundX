const offIcon = document.querySelector(".fa-volume-off");
const onIcon = document.querySelector(".fa-volume-high");

toggleMute = () => {
    if (localStorage.getItem("muted") == "false") {
        localStorage.setItem("muted", "true");
    } else {
        localStorage.setItem("muted", "false");
    }
    checkMuted();
}

//Page transfering

const pageChangeDelay = 75;

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


