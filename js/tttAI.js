var rgb = "rgb(231, 101, 101)"; 
var turn = 1;
var moveLock = false;
var tilesUsed = 0;
var success = true;

window.onload = function() {
    turn = parseInt(localStorage.getItem("firstTurn"));
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
    ElementId("tttCover").style.opacity = 0;
    ElementId("tttCover").style.visibility = "hidden";
}

function checkWin() {
    // Horizontal, Verticle
    for (var x = 0; x < 3; x++) {
        if (board[0][x] == turn && board[1][x] == turn && board[2][x] == turn) {
            for (var e = 0; e < 3; e++) {
                ElementId(e + "" + x + "x").parentElement.style.backgroundColor = rgb;
            }
            return(turn)
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
            ElementId(x + "" + y + "x").parentElement.style.backgroundColor = "rgb(240, 192, 90)";
        }
    }
}

function LOCK() {
    if (!moveLock) {
        moveLock = true;
        setTimeout(() => {
            moveLock = false;
        }, 1000);
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
            ElementId("endText").innerHTML = ("X <br> Wins!");
            localStorage.setItem("scoreX", parseInt(localStorage.getItem("scoreX"))+1);
            break;
        case 2:
            ElementId("endText").innerHTML = "O <br> Wins!";
            localStorage.setItem("scoreO", parseInt(localStorage.getItem("scoreO"))+1);
            break;
    }
    //Swap turns
    if (localStorage.getItem("firstTurn") == "1") {
        localStorage.setItem("firstTurn", "2");
    } else {
        localStorage.setItem("firstTurn", "1");
    }
    
    updateScores();
    ElementId("game").style.pointerEvents = "none";

    setTimeout(() => {
        ElementId("endBox").style.visibility = "visible";
        runAnimation("endBox");
    }, 850);
}

function clickTile(x, y) {

    if (LOCK()) { return; }

    if (board[x][y] != 0 ) {
        console.log("Invalid move");
        return false;
    }

    tilesUsed++;
    if (turn == 1) {
        board[x][y] = turn;
        checkGame(checkWin(turn));
        turn = 2;
    } else {
        board[x][y] = turn;
        checkGame(checkWin(turn));
        turn = 1;
    }
    updateBoard();

    return true;
}

function aiTrigger() {

    while (clickTile(Math.floor(Math.random()*3), Math.floor(Math.random()*3)) == false) {
        clickTile(Math.floor(Math.random()*3), Math.floor(Math.random()*3));
    }
    
    console.log("THE BOT MOVED HEHEHAHEAHAEHAEHAEHAEHEAAHHE");
}

function resetScores() {
    localStorage.setItem("scoreX", "0");
    localStorage.setItem("scoreO", "0");
    updateScores();
}

if (localStorage.getItem("scoreX") == null) {
    localStorage.setItem("scoreX", "0");
    localStorage.setItem("scoreO", "0");
    localStorage.setItem("firstTurn", "1");
    console.log("Scores initialized");
}

function updateScores() {
    ElementId("leftScore").innerHTML =  localStorage.getItem("scoreX");
    ElementId("rightScore").innerHTML =  localStorage.getItem("scoreO");
}