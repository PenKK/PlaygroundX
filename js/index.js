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
gg = () => {
    setTimeout(() => {
        window.location.href = "guessing-game.html";
    }, 100);	
}

rps = () => {
    setTimeout(() => {
        window.location.href = "rock-paper-scissors.html";
    }, 100);	
}

ttt = () => {
    setTimeout(() => {
        window.location.href = "tic-tac-toe.html";
    }, 100);	
}

tft = () => {
    setTimeout(() => {
        window.location.href = "2048.html";
    }, 100);
}

ach = () => {
    setTimeout(() => {
        window.location.href = "achievements.html";
    }, 100);
}

cont = () => {
    setTimeout(() => {
        window.location.href = "controls.html";
    }, 100);
}


