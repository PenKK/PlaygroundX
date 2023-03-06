var rgb = "rgb(100, 0, 0)"; 
var turn = 1;
var moveLock = false;
var aiLock = false;
var pass = true;
var tilesUsed = 0;
var gameEnded = false;
var gameStarted = false;
var debug = false;
var tileElements = [];

window.onload = () => {
    turn = parseInt(localStorage.getItem("AIfirstTurn"));
    tileElements = document.querySelectorAll("i.fa-solid.fa-x,i.fa-solid.fa-o");
    updateScores();
}

var board = [[0,0,0],
             [0,0,0],
             [0,0,0]];

function updateBoard() {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {

            var id = x + "" + y;

            switch (board[x][y]) {
                case 0:
                    break;
                case 1:
                    ElementId(id + "x").style.opacity = 1;
                    ElementId(id + "x").parentElement.style.pointerEvents = "none";
                    break;
                case 2:
                    ElementId(id + "o").style.opacity = 1;
                    ElementId(id + "o").parentElement.style.pointerEvents = "none";
                    break;
            }
        }
        
    }
}

function startGame() {   
    if (gameStarted) {
        return;
    } 
    gameStarted = true;
    
    ElementId("tttCover").style.opacity = 0;
    ElementId("tttCover").style.visibility = "hidden";

    if (turn == 2) {
        ElementId("oBox").style.backgroundColor = "rgb(102, 28, 28)";
        ElementId("xBox").style.backgroundColor = "blanchedalmond";
    } else {
        ElementId("xBox").style.backgroundColor = "rgb(102, 28, 28)";
        ElementId("oBox").style.backgroundColor = "blanchedalmond";
    }
    ElementId("xBox").style.opacity = "1";
    ElementId("oBox").style.opacity = "1";

    if (turn == 2) {
        aiTrigger();
    }
}

function checkWin() {
    // Horizontal, Verticle
    for (var x = 0; x < 3; x++) {
        if (board[0][x] == turn && board[1][x] == turn && board[2][x] == turn) {
            for (var e = 0; e < 3; e++) {
                ElementId(e + "" + x + "x").parentElement.style.backgroundColor = rgb;
            }
            return(turn);
        }
        if (board[x][0] == turn && board[x][1] == turn && board[x][2] == turn) {
            for (var e = 0; e < 3; e++) {
                ElementId(x + "" + e + "x").parentElement.style.backgroundColor = rgb;
            }
            return(turn);
        }
    }
    //Diagonal
    if (board[0][0] == turn && board[1][1] == turn && board[2][2] == turn) {
        for (var e = 0; e < 3; e++) {
            ElementId(e + "" + e + "x").parentElement.style.backgroundColor = rgb;
        }
        return(turn);
    }
    if (board[0][2] == turn && board[1][1] == turn && board[2][0] == turn) {
        ElementId("02x").parentElement.style.backgroundColor = rgb;
        ElementId("11x").parentElement.style.backgroundColor = rgb;
        ElementId("20x").parentElement.style.backgroundColor = rgb;
        return(turn);
    }

    if (tilesUsed == 9) { 
        return -1; 
    }
    return 0;
}

function tilesTie() {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            ElementId(x + "" + y + "x").parentElement.style.backgroundColor = "rgb(255, 224, 175)";
        }
    }
}

function LOCK() {
    if (!moveLock) {
        moveLock = true;
        setTimeout(() => {
            moveLock = false;
        }, 325);
    } else {
        return true;
    }
}

function checkGame(turn) {
    switch (turn) {
        case -1:
            tilesTie();
            break;
        case 0:
            return;
        case 1:
            ElementId("endText").innerHTML = ("Player <br> Wins!");
            incrementStorage("scorePlayer")
            break;
        case 2:
            ElementId("endText").innerHTML = "Computer <br> Wins!";
            if (localStorage.getItem("TIC_TAC_TOE_LOSER") != "true") {
                localStorage.setItem("TIC_TAC_TOE_LOSER", "true");
                notification("Achievement completed: Tic Tac Toe Loser...");
            }
            incrementStorage("scoreAI");
            break;
    }
    ElementId("xBox").style.opacity = "0";
    ElementId("oBox").style.opacity = "0";

    gameEnded = true;
    //Swap turns
    if (localStorage.getItem("AIfirstTurn") == "1") {
        localStorage.setItem("AIfirstTurn", "2");
    } else {
        localStorage.setItem("AIfirstTurn", "1");
    }
    
    updateScores();
    ElementId("game").style.pointerEvents = "none";

    setTimeout(() => {
        ElementId("endBox").style.visibility = "visible";
        runAnimation("endBox");
    }, 1000);
}

function clickTile(x, y, skip) {
    if (skip) {
        if (gameEnded) {
            // console.log("AI move stopped, game ended"); 
            return;
        }
    } else if (LOCK() || gameEnded) {
        return;
    }

    if (board[x][y] != 0) {
        if (skip) {
            // console.log("Invalid move, rolling another tile"); 
            clickTile(Math.floor(Math.random()*3), Math.floor(Math.random()*3), true);
        }
        pass = false;
        return;
    }
    pass = true;
    ElementId("game").style.pointerEvents = "all";
    tilesUsed++;
    if (turn == 1) {
        board[x][y] = turn;
        checkGame(checkWin(turn));
        ElementId("oBox").style.backgroundColor = "rgb(102, 28, 28)";
        ElementId("xBox").style.backgroundColor = "blanchedalmond";
        turn = 2;
    } else {
        board[x][y] = turn;
        checkGame(checkWin(turn));
        ElementId("xBox").style.backgroundColor = "rgb(102, 28, 28)";
        ElementId("oBox").style.backgroundColor = "blanchedalmond";
        turn = 1;
    }
    updateBoard();
}

function aiTrigger() {
    setTimeout(() => {
        if (pass) {
            clickTile(Math.floor(Math.random()*3), Math.floor(Math.random()*3), true);
        }
    }, 325);
    ElementId("game").style.pointerEvents = "none";
}

function resetScores() {
    localStorage.setItem("scorePlayer", "0");
    localStorage.setItem("scoreAI", "0");
    updateScores();
}

if (localStorage.getItem("scorePlayer") == null) {
    localStorage.setItem("scorePlayer", "0");
    localStorage.setItem("scoreAI", "0");
    localStorage.setItem("AIfirstTurn", "1");
    console.log("AI VS scores initialized");
    localStorage.setItem("TIC_TAC_TOE_LOSER", "false");
    console.log("Tic Tac Toe AI achievements initialized");
}

function updateScores() {
    ElementId("leftScore").innerHTML =  localStorage.getItem("scorePlayer");
    ElementId("rightScore").innerHTML =  localStorage.getItem("scoreAI");
}