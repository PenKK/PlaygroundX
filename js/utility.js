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
//Controls
document.addEventListener("keydown", pageKeyDown, false);

function pageKeyDown(e) {
    if(e.keyCode == 72) {
        window.location.href = "index.html";
    } else 

    if(e.keyCode == 82) {
        location.reload();
    }

    //Page specific controls
    if (document.URL.endsWith("tic-tac-toe.html") || document.URL.endsWith("tic-tac-toe-ai.html")) {
        switch(e.keyCode) { //Numpad keys
            case 36:
                clickTile(0,0);
                aiTriggerKeyboard();
                break;
            case 38:
                clickTile(0,1);
                aiTriggerKeyboard();
                break;
            case 33:
                clickTile(0,2);
                aiTriggerKeyboard();
                break;
            case 37:
                clickTile(1,0);
                aiTriggerKeyboard();
                break;
            case 12:
                clickTile(1,1);
                aiTriggerKeyboard();
                break;
            case 39:
                clickTile(1,2);
                aiTriggerKeyboard();
                break;
            case 35:
                clickTile(2,0);
                aiTriggerKeyboard();
                break;
            case 40:
                clickTile(2,1);
                aiTriggerKeyboard();
                break;
            case 34:
                clickTile(2,2);
                aiTriggerKeyboard();
                break;
            case 13:
                startGame();
                break;
        }
        return;
    }

    if (document.URL.endsWith("index.html")) {
        switch(e.keyCode) {
            case 49:
                
        }
        alert(e.keyCode);
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