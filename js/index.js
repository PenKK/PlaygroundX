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

toggleFreddyFazbearMode = () => {
    if (localStorage.getItem("williamAfton") != "true") {
        localStorage.setItem("williamAfton", "true");
    } else {
        localStorage.setItem("williamAfton", "false");
    }
    checkAfton();
}

//Page transfering

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