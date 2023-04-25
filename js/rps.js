//Global variables

var selectLock = false;
var playerScore = 0;
var AIScore = 0;
var playerReverseSweep = false;
var computerReverseSweep = false;
var gameOver = false;

window.onload = ()  => {
    updateScores();
}

function sweepDebug() {
    computerReverseSweep = true;
    playerReverseSweep = true;
}


//Game functions

function displayResult(playerMove, AIMove) {

    resetAnimation("leftSmallGameBox", "smallGameBox");
    resetAnimation("rightSmallGameBox", "smallGameBox");

    hide("playerRock");
    hide("playerPaper");
    hide("playerScissors");

    hide("computerRock");
    hide("computerPaper");
    hide("computerScissors");

    switch(playerMove) {
        case 0:
            show("playerRock");
            ElementId("boxResultTextPlayer").innerHTML =  "Rock";
            break;
        case 1:
            show("playerPaper");
            ElementId("boxResultTextPlayer").innerHTML =  "Paper";
            break;
        case 2:
            show("playerScissors");
            ElementId("boxResultTextPlayer").innerHTML =  "Scissors";
            break;
    }

    switch(AIMove) {
        case 0:
            show("computerRock");
            ElementId("boxResultTextComputer").innerHTML =  "Rock";
            break;
        case 1:
            show("computerPaper");
            ElementId("boxResultTextComputer").innerHTML =  "Paper";
            break;
        case 2:
            show("computerScissors");
            ElementId("boxResultTextComputer").innerHTML =  "Scissors";
            break;
    }

    show("leftSmallGameBox");
    show("rightSmallGameBox");
    
    document.getElementById('leftSmallGameBox').style.animationPlayState = "running";
    document.getElementById('rightSmallGameBox').style.animationPlayState = "running";
}

function tie() {
    ElementId("result").innerHTML =  "It's a tie!";

    ElementId("rightSmallGameBox").style.backgroundColor = "blanchedalmond";
    ElementId("leftSmallGameBox").style.backgroundColor = "blanchedalmond";
}

function winPlayer() {
    playerScore++;

    ElementId("rightSmallGameBox").style.backgroundColor = "blanchedalmond";
    ElementId("leftSmallGameBox").style.backgroundColor = "rgb(255, 209, 140)";
    
    if(playerScore == 3) {
        ElementId("result").innerHTML = "Player wins the game!";
    } else {
        ElementId("result").innerHTML = "Player wins the round!";
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
            winSound.play();
            break;
    }
}

function winAI() {
    AIScore++;

    ElementId("leftSmallGameBox").style.backgroundColor = "blanchedalmond";
    ElementId("rightSmallGameBox").style.backgroundColor = "rgb(255, 209, 140)";
    
    if(AIScore == 3) {
        ElementId("result").innerHTML = "Computer wins the game!";
    } else {
        ElementId("result").innerHTML = "Computer wins the round!";
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

function disableRPSButtons() {
    ElementId("r").disabled = true;
    ElementId("p").disabled = true;
    ElementId("s").disabled = true;
    gameOver = true;
}

function endPlayer() {
    disableRPSButtons();
    ElementId("winBox").removeAttribute("hidden");
    ElementId("endText").innerHTML = "Congratulations you win!";

    if(playerReverseSweep) {
        rainbowAnimation();
        ElementId("endText").innerHTML = "YOU GOT A REVERSE SWEEEP!";
        ElementId("questionBox").removeAttribute("hidden");

        if (localStorage.getItem("SWEEPER_OR_SWEEPED") != "true") {
            localStorage.setItem("SWEEPER_OR_SWEEPED", "true");
            notification("Achievement unlocked: Sweeper or Sweeped?")
        }
    }

    incrementStorage("playerScore");

    if(localStorage.getItem("playerScore") == "NaN") {
        localStorage.setItem("playerScore", 1);
    }

    updateScores();
}

function endComputer() {
    disableRPSButtons();
    ElementId("winBox").removeAttribute("hidden");
    ElementId("endText").innerHTML = "The computer won!";

    if(computerReverseSweep) {
        rainbowAnimation();
        ElementId("endText").innerHTML = "THE COMPUTER GOT A REVERSE SWEEP!";
        ElementId("questionBox").removeAttribute("hidden");

        if (localStorage.getItem("SWEEPER_OR_SWEEPED") != "true") {
            localStorage.setItem("SWEEPER_OR_SWEEPED", "true");
            notification("Achievement complete: Sweeper or Sweeped?")
        }

    }
    
    incrementStorage("computerScore");

    if(localStorage.getItem("computerScore") == "NaN") {
        localStorage.setItem("computerScore", 1);
    }

    updateScores();
}

function play(move) {
    if (gameOver) {
        return;
    }

    if(!selectLock) {

        selectLock = true;
        
        setTimeout(function() {
        selectLock = false;
        }, 150);

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
    localStorage.setItem("SWEEPER_OR_SWEEPED", false);
    console.log("Achievement local storage initialized");
}

function updateScores() {
    ElementId("leftScore").innerHTML =  localStorage.getItem("playerScore");
    ElementId("rightScore").innerHTML =  localStorage.getItem("computerScore");
}