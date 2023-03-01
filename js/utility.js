//Utility
function ElementId(id) {
    return document.getElementById(id);
}

function hide(id) {
    ElementId(id).style.visibility = "hidden";
}

function show(id) {
    ElementId(id).style.visibility = "visible";
}

function grantAchievements() {
    localStorage.setItem("MASTER_GUESSER", true);
    localStorage.setItem("SWEEPER_OR_SWEEPED", true);
    localStorage.setItem("TIC_TAC_TOE_LOSER", true);
}

function incrementStorage(item) {
    localStorage.setItem(item, parseInt(localStorage.getItem(item))+1)
}

//Controls
document.addEventListener("keydown", pageKeyDown, false);

function pageKeyDown(e) {
    // alert(e.keyCode);
    if (event.ctrlKey || event.shiftKey) {
        return;
    }
    //General controls across all pages
    switch(e.keyCode) {
        case 72: //H
            window.location.href = "index.html";
            return;
        case 82: //R
            location.reload();
            return;
        case 67: //C
            window.location.href = "controls.html";
            return;
        case 65: //A
            location.href = "achievements.html";
            break;
    }

    //Page specific controls

    if (document.URL.endsWith("index.html")) {
        switch(e.keyCode) {
            case 49: 
                location.href = "guessing-game.html";
                break;
            case 50:
                location.href = "rock-paper-scissors.html";
                break;
            case 51:
                location.href = "tic-tac-toe.html";
                break;
        }
    } else 

    if (document.URL.endsWith("rock-paper-scissors.html")) {
        switch(e.keyCode) {
            case 49:
                play(0);
                break;
            case 50:
                play(1);
                break;
            case 51:
                play(2);
                break;
        }
    } else

    if (document.URL.endsWith("tic-tac-toe.html") || document.URL.endsWith("tic-tac-toe-ai.html")) {
        switch(e.keyCode) { //Numpad keys
            case 36:
                clickTile(0,0);
                aiTriggerKeyboard();
                return;
            case 38:
                clickTile(0,1);
                aiTriggerKeyboard();
                return;
            case 33:
                clickTile(0,2);
                aiTriggerKeyboard();
                return;
            case 37:
                clickTile(1,0);
                aiTriggerKeyboard();
                return;
            case 12:
                clickTile(1,1);
                aiTriggerKeyboard();
                return;
            case 39:
                clickTile(1,2);
                aiTriggerKeyboard();
                return;
            case 35:
                clickTile(2,0);
                aiTriggerKeyboard();
                return;
            case 40:
                clickTile(2,1);
                aiTriggerKeyboard();
                return;
            case 34:
                clickTile(2,2);
                aiTriggerKeyboard();
                return;
            case 13:
                startGame();
                return;
        }
        return;
    }
}

function aiTriggerKeyboard() {
    if (document.URL.endsWith("tic-tac-toe-ai.html")) {
        aiTrigger();
    }
}

//Page transfering
function goTo(location) {
    if (location == 1) {
        window.location.href = "tic-tac-toe-ai.html";
    } else if (location == 0) {
        window.location.href = "tic-tac-toe.html";
    }
}

//Notification
var notiLock = false;

function notification(message) {
    if (!notiLock) {
        notiLock = true;

        ElementId("noti").style.opacity = 1;
        ElementId("notiText").innerHTML = message;
        runAnimation("noti")
    
        setTimeout(function() {
            ElementId("noti").style.opacity = 0;
            notiLock = false;
        }, 5000);
    
        resetAnimation("noti", "notificationEnterClass");
    }
    
}

//Animation
function resetAnimation(cls, id) {
    var element = document.getElementById(cls);
    element.classList.remove(id);
    void element.offsetWidth;
    element.classList.add(id);
    // console.log("Class " + cls + " has been reset with animation "+ animation);
}

function runAnimation(id) {
    document.getElementById(id).style.animationPlayState = "running";
}

function rainbowAnimation() {
    document.body.style.backgroundImage = "linear-gradient(45deg, rgb(238, 119, 82), rgb(231, 60, 126), rgb(35, 166, 213), rgb(35, 213, 171))";
    document.body.classList.add("gradientAnimation");
}

//Mobile check

setTimeout(() => {
    if (navigator.userAgent.includes("Mobile") && !document.URL.endsWith("index.html")) {
        console.log("Mobile")
        // ElementId("mobileHomeButton").style.visibility = "visible"; DO LATER
        if (document.URL.includes("tic-tac-toe")) {
            for (let i = 0; i < tileElements.length; i++) {
                tileElements[i].classList.add("mobileScale");
            }
        }
    }
}, 100);