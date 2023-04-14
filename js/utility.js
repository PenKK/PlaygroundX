if (localStorage.getItem("visited") == null && document.URL.endsWith("index.html")) {
    notification("Press H to return to the home page at any time!")
    localStorage.setItem("visited", "true");
    localStorage.setItem("muted", "false");
}

if ((localStorage.getItem("MASTER_GUESSER") == "true") && 
    (localStorage.getItem("SWEEPER_OR_SWEEPED") == "true") && 
    (localStorage.getItem("TIC_TAC_TOE_LOSER") == "true" &&
     localStorage.getItem("2048_AMBASSADOR") == true &&
    document.URL.endsWith("index.html"))){
    ElementId("achievementsButton").style.backgroundSize = "300%";
}

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

function aiTriggerKeyboard() {
    if (document.URL.endsWith("tic-tac-toe-ai.html")) {
        aiTrigger();
    }
}

//Page transfering
function goTo(location) {
    setTimeout(() => {
        if (location == 1) {
            window.location.href = "tic-tac-toe-ai.html";
        } else if (location == 0) {
            window.location.href = "tic-tac-toe.html";
        }
    }, 100);
    
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

//Audio

const buttonTiles = document.getElementsByClassName("buttonSound");
const clickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");

for (let i = 0; i < buttonTiles.length; i++) {
    buttonTiles[i].addEventListener("click", function() {
        clickSound.play();
    })
}

checkMuted = () => {
    try {
        if (localStorage.getItem("muted") == "true") {
            clickSound.volume = 0;
            onIcon.style.opacity = 0;
            offIcon.style.opacity = 1;
        } else {
            clickSound.volume = 1;
            onIcon.style.opacity = 1;
            offIcon.style.opacity = 0;
        }
    } catch {

    }
    
}

checkMuted();