if (localStorage.getItem("muted") == null) {
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

const notificationSound = new Audio("https://drive.google.com/uc?export=download&id=1tZNIUh7CPhYf16_5GXOcSgxmB_SI52oT");

function notification(message) {
    if (!notiLock) {
        notiLock = true;

        notificationSound.play();
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

function rainbowAnimationEl(element, speed) {
    element.style.backgroundImage = "linear-gradient(45deg, rgb(238, 119, 82), rgb(231, 60, 126), rgb(35, 166, 213), rgb(35, 213, 171))";
    element.style.animation = "gradient " + speed + "s ease infinite";
    element.classList.add("gradientAnimation");
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

const pageChangeDelay = 140;

locationReload = () => {
    setTimeout(() => {
        location.reload();
    }, pageChangeDelay);
}

//Audio

const buttonTiles = document.getElementsByClassName("buttonSound");
const clickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");

for (let i = 0; i < buttonTiles.length; i++) {
    buttonTiles[i].addEventListener("click", function() {
        clickSound.play();
    })
}

//Music

function getSongIndex() {
    return parseInt(localStorage.getItem("song"));
}

if (localStorage.getItem("song") == null) {
    localStorage.setItem("song", "0");
}

checkMuted = () => {
    
    if (localStorage.getItem("muted") == "true") {
        clickSound.volume = 0;
        onIcon.style.opacity = 0;
        offIcon.style.opacity = 1;

        pauseAllSongs();
    } else {
        clickSound.volume = 1;
        onIcon.style.opacity = 1;
        offIcon.style.opacity = 0;
        if (localStorage.getItem("williamAfton") == "true") {
            audioList[getSongIndex()].play();
        }

    }
    
}

const williamAftonRap = new Audio("https://docs.google.com/uc?export=download&id=1o6ltnLLWPBMq2-zbHiwllc5NowbB3IHH");
const itsBeenSolong = new Audio("https://drive.google.com/uc?export=download&id=14ty-7Tmx3LVAOg0KQSk0oASONeP46MRI");
const harrHarrNoRap = new Audio("https://drive.google.com/uc?export=download&id=1MpKk2az1Wp83zrBz_MKcbb0E4ssezDMx");
const jennifer17 = new Audio("https://drive.google.com/uc?export=download&id=1rvFRzkFoPTkShN5XQFzG4pNPBo1LVD_Q");

const audioList = [williamAftonRap, itsBeenSolong, harrHarrNoRap, jennifer17];

audioList.forEach(element => {
    element.onended = () => {
        skipSong();
    }
});

checkAfton = () => {

    const imageStyleEl = document.body.style;
    const header2Elements = document.getElementsByClassName("aftonColor");

    if (localStorage.getItem("williamAfton") == "true") {
        
        ElementId("skipButton").removeAttribute("hidden");
        try {
            ElementId("aftonHeader").innerHTML = "WILLIAM AFTON MODE ACTIVATED";
        } catch (error) {}
        
        
        imageStyleEl.backgroundImage = "url(https://i.scdn.co/image/ab6761610000e5eba07eb018071ca45120dceb4f)";

        for (let i = 0; i < header2Elements.length; i++) {
            header2Elements[i].style.color = "white";
        }
        
        playSong();
    } else {

        ElementId("skipButton").hidden = true;
        document.body.style.backgroundImage = "none";
        try {
            ElementId("aftonHeader").innerHTML = "Capstone Project";
        } catch (error) {}
        
        for (let i = 0; i < header2Elements.length; i++) {
            header2Elements[i].style.color = "black";
        }
        
        pauseAllSongs();
    }

    checkMuted();
}

pauseAllSongs = () => {
    audioList.forEach(element => {
        element.pause();
    });
}

playSong = () => {
    pauseAllSongs();

    audioList[getSongIndex()].play();

    checkMuted();
}

skipSong = () => {

    incrementStorage("song");

    if (getSongIndex() >= audioList.length) {
        localStorage.setItem("song", "0");
    }

    playSong();
}

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

setInterval(() => {
    localStorage.setItem("HarrHarrTime", audioList[getSongIndex()].currentTime);
}, 500);

if (localStorage.getItem("HarrHarrTime") != null) {
    audioList[getSongIndex()].currentTime = localStorage.getItem("HarrHarrTime");
}

checkAfton();