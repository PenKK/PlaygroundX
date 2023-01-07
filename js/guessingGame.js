//Enter key listener

function eventKey(e, func) {
    // console.log("key code: "+e.keyCode)
    if(e.keyCode == 13) {
        func();
    }
}

//Game

var guess;
var ans;
var el;
var triesCounter = 0;
var enterLocked = false;
var playLocked = false;

function play() {

    if(3>ElementId("range").value){
        if(!playLocked) {

            playLocked = true;
            notification("Enter a value<br> of at least 3");
            ElementId("play").style.color = "rgb(252, 50, 50)";
            
            setTimeout(function(){
                ElementId("play").style.color = "bisque";
            }, 500)

            setTimeout(function(){
                playLocked = false;
            }, 1000)
        }
    }

    else {
        ElementId("range").disabled = true;
        ElementId("play").disabled = true;
        ElementId("guess").disabled = false;
        document.getElementById('enter').disabled = false;
        ans = Math.round(Math.random()*ElementId("range").value);
        // console.log(ans);
    }
}

function enterGuess() {

    if(!enterLocked) {

        enterLocked = true;
        guess = ElementId("guess").value;

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
    ElementId("guess").disabled = true;
    document.getElementById('enter').disabled = true;

    checkAchievements();
}

//Local storage achievements

function checkAchievements() {
    if(localStorage.getItem("masterGuesser") == "false") {
        if (ElementId("range").value>999999 && 20 >= triesCounter) {
            localStorage.setItem("masterGuesser", true);
            notification("Achievement completed: Master Guesser!");
        }
    }
}

if (localStorage.getItem("masterGuesser") == null) {
    console.log("Guessing game achievements initialized");
    localStorage.setItem("masterGuesser", false);
}
