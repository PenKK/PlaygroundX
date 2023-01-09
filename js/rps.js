//Global variables

var selectLock = false;
var playerScore = 0;
var AIScore = 0;
var playerReverseSweep = false;
var computerReverseSweep = false;

window.onload = function() {
    updateScores(); //Load scores
}

//Utility functions

function hide(id) {
    ElementId(id).style.visibility = "hidden";
}

function show(id) {
    ElementId(id).style.visibility = "visible";
}

function setText(id, text) {
    ElementId(id).innerHTML = text;
}

//Game functions

function displayResult(playerMove, AIMove) {

    resetAnimation("leftSmallGameBox", "smallGameBox");
    resetAnimation("rightSmallGameBox", "smallGameBox");

    hide("playerRock");
    hide("playerPaper");
    hide("playerScissors")

    hide("computerRock");
    hide("computerPaper");
    hide("computerScissors");

    switch(playerMove) {
        case 0:
            show("playerRock");
            setText("boxResultTextPlayer", "Rock");
            break;
        case 1:
            show("playerPaper");
            setText("boxResultTextPlayer", "Paper");
            break;
        case 2:
            show("playerScissors");
            setText("boxResultTextPlayer", "Scissors");
            break;
    }

    switch(AIMove) {
        case 0:
            show("computerRock");
            setText("boxResultTextComputer", "Rock");
            break;
        case 1:
            show("computerPaper");
            setText("boxResultTextComputer", "Paper");
            break;
        case 2:
            show("computerScissors");
            setText("boxResultTextComputer", "Scissors");
            break;
    }

    show("leftSmallGameBox");
    show("rightSmallGameBox");
    
    document.getElementById('leftSmallGameBox').style.webkitAnimationPlayState = "running";
    document.getElementById('rightSmallGameBox').style.webkitAnimationPlayState = "running";
}

function tie() {
    setText("result", "It's a tie!");

    ElementId("rightSmallGameBox").style.backgroundColor = "blanchedalmond";
    ElementId("leftSmallGameBox").style.backgroundColor = "blanchedalmond";
}

function winPlayer() {
    playerScore++;

    ElementId("rightSmallGameBox").style.backgroundColor = "blanchedalmond";
    ElementId("leftSmallGameBox").style.backgroundColor = "rgb(255, 209, 140)";
    
    if(playerScore == 3) {
        setText("result", "Player wins the game!");
    } else {
        setText("result", "Player wins the round!");
    }

    switch(playerScore) {
        case 1:
            ElementId("ps1").style.opacity = 1;
            break;
        case 2:
            ElementId("ps2").style.opacity = 1;
            if(AIScore == 0) {
                computerReverseSweep = true;
            }
            break;
        case 3:
            ElementId("ps3").style.opacity = 1;
            endPlayer();
            break;
    }
}

function winAI() {
    AIScore++;

    ElementId("leftSmallGameBox").style.backgroundColor = "blanchedalmond";
    ElementId("rightSmallGameBox").style.backgroundColor = "rgb(255, 209, 140)";
    
    if(AIScore == 3) {
        setText("result", "Computer wins the game!");
    } else {
        setText("result", "Computer wins the round!");
    }
    
    switch(AIScore) {
        case 1:
            ElementId("cs1").style.opacity = 1;
            break;
        case 2:
            ElementId("cs2").style.opacity = 1;
            if(playerScore == 0) {
                playerReverseSweep = true;
            }
            break;
        case 3:
            ElementId("cs3").style.opacity = 1;
            endComputer();
            break;
    }
}

function disableRPS() {
    document.getElementById("r").disabled = true;
    document.getElementById("p").disabled = true;
    document.getElementById("s").disabled = true;
}

function endPlayer() {
    disableRPS();
    ElementId("winBox").removeAttribute("hidden");
    ElementId("endText").innerHTML = "Congratulations you win!";

    if(playerReverseSweep) {
        sweepAnimation();
        ElementId("endText").innerHTML = "YOU GOT A REVERSE SWEEEP!!!";
        ElementId("questionBox").removeAttribute("hidden");

        if (localStorage.getItem("sweeperSweeped") != "true") {
            localStorage.setItem("sweeperSweeped", "true");
            notification("Achievement unlocked: Sweeper or Sweeped?")
        }
    }

    localStorage.setItem("playerScore", parseInt(localStorage.getItem("playerScore"))+1);

    if(localStorage.getItem("playerScore") == "NaN") {
        localStorage.setItem("playerScore", 1);
    }

    updateScores();
}

function endComputer() {
    disableRPS();
    ElementId("winBox").removeAttribute("hidden");
    ElementId("endText").innerHTML = "The computer won!";

    if(computerReverseSweep) {
        sweepAnimation();
        ElementId("endText").innerHTML = "THE COMPUTER GOT A REVERSE SWEEP!";
        ElementId("questionBox").removeAttribute("hidden");

        if (localStorage.getItem("sweeperSweeped") != "true") {
            localStorage.setItem("sweeperSweeped", "true");
            notification("Achievement unlocked: Sweeper or Sweeped?")
        }

    }
    
    localStorage.setItem("computerScore", parseInt(localStorage.getItem("computerScore"))+1);

    if(localStorage.getItem("computerScore") == "NaN") {
        localStorage.setItem("computerScore", 1);
    }

    updateScores();
}

function sweepAnimation() {
    document.body.style.backgroundImage = "linear-gradient(45deg, rgb(238, 119, 82), rgb(231, 60, 126), rgb(35, 166, 213), rgb(35, 213, 171))";
    ElementId("rpsBody").classList.add("gradientAnimation");
}

function play(move) {

    if(!selectLock) {

        selectLock = true;
        
        setTimeout(function() {
        selectLock = false;
        }, 300);

        var moveAI = Math.floor(Math.random()*3);
        displayResult(move, moveAI);

        if(move == moveAI) {
            tie();
            return;
        }
        
        else if(move == 0) { //Player selects rock
            switch(moveAI) {
                case 1:
                    winAI(move, moveAI);
                    return;
                case 2:
                    winPlayer(move, moveAI);
                    return;
            }
        }

        else if(move == 1) { //Player selects paper
            switch(moveAI){
                case 0:
                    winPlayer(move, moveAI);
                    return;
                case 2:
                    winAI(move, moveAI);
                    return;
            }
        }

        else if(move == 2) { //Player selects scissors
            switch(moveAI){
                case 0:
                    winAI(move, moveAI);
                    return;
                case 1:
                    winPlayer(move, moveAI);
                    return;
            }
        }
    }
}

//Scores + achievement local storage

if (localStorage.getItem("playerScore") == null) {
    localStorage.setItem("playerScore", 0);
    localStorage.setItem("computerScore", 0);
    console.log("Score local storage initialized")
    localStorage.setItem("sweeperSweeped", false);
    console.log("Achievement local storage initialized");
}


function updateScores() {
    setText("leftScore", localStorage.getItem("playerScore"));
    setText("rightScore", localStorage.getItem("computerScore"));
}