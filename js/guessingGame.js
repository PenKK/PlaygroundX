//Utility
function eventKey(e, func) {
    // console.log("key code: "+e.keyCode)
    if(e.keyCode == 13) {
        func();
    }
}

function rangeElement() {
    return document.getElementById('range');
}

function guessElement() { 
    return document.getElementById('guess');
}

//Notification

function notification(message){
    var erElement = document.getElementById('noti');
    erElement.innerHTML = message;
    erElement.style.webkitAnimationPlayState = "running";
    resetAnimation("noti", "notificationClass");
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
    document.getElementById(id).style.webkitAnimationPlayState = "running";
}

//Game

var guess;
var ans;
var el;
var triesCounter = 0;
var enterLocked = false;
var playLocked = false;

function play(){

    if(3>rangeElement().value){
        if(!playLocked) {

            playLocked = true;
            notification("Enter a value of <br> at least 3!");
            document.getElementById('play').style.color = "rgb(252, 50, 50)";
            
            setTimeout(function(){
                document.getElementById('play').style.color = "bisque";
            }, 500)

            setTimeout(function(){
                playLocked = false;
            }, 1000)
        }
    }

    else {
        rangeElement().disabled = true;
        document.getElementById('play').disabled = true;
        guessElement().disabled = false;
        document.getElementById('enter').disabled = false;
        ans = Math.round(Math.random()*rangeElement().value);
        // console.log(ans);
    }
}

function enterGuess(){

    if(!enterLocked) {

        enterLocked = true;
        guess = guessElement().value;

        if(guess==ans){
            triesCounter++;

            runAnimation('leftUpArrow');
            resetAnimation("leftUpArrow", "upArrow");

            runAnimation('rightUpArrow');
            resetAnimation("rightUpArrow", "upArrow");

            runAnimation('leftDownArrow');
            resetAnimation("leftDownArrow", "downArrow");

            runAnimation('rightDownArrow');
            resetAnimation("rightDownArrow", "downArrow");

            winGame();
        } 

        else if(guess>ans){
            runAnimation('leftDownArrow');
            resetAnimation("leftDownArrow", "downArrow");

            runAnimation('rightDownArrow');
            resetAnimation("rightDownArrow", "downArrow");

            triesCounter++;
        }

        else if(guess<ans) {
            runAnimation('leftUpArrow');
            resetAnimation("leftUpArrow", "upArrow");

            runAnimation('rightUpArrow');
            resetAnimation("rightUpArrow", "upArrow");

            triesCounter++;
        }

        setTimeout(function() {
            enterLocked = false;
        }, 600);
        
    }

}

function winGame() {
    document.getElementById('triesText').innerHTML = "It took you " + triesCounter +" tries";
    document.getElementById('winBox').removeAttribute("hidden");
    guessElement().disabled = true;
    document.getElementById('enter').disabled = true;

    checkAchievements();
}

//Local storage achievements

function checkAchievements() {
    if(localStorage.getItem("masterGuesser") == "false") {
        if (rangeElement().value>999999 && 20 >= triesCounter) {
            localStorage.setItem("masterGuesser", true);
            notification("Achievement completed: Master Guesser!");
        }
    }
}

if (localStorage.getItem("masterGuesser") == null) {
    console.log("Guessing game achievements initialized");
    localStorage.setItem("masterGuesser", false);
}
