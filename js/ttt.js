
var turn = 1;

var moveLock = false;

var board = [[0,0,0],
             [0,0,0],
             [0,0,0]];

function randTile() {
    return Math.floor(Math.random()*3);
}

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

function LOCK() {
    if (moveLock == false) {
        moveLock = true;
        setTimeout(() => {
            moveLock = false;
        }, 250);
    } else {
        return true;
    }
}

function checkWin() {
    for (let x = 0; i < 3; i++) {
        for (let y = 0; y < 3; y++) {
            board[x][y]    
        }
    } 
}

function one() {

    if (LOCK()) { return; } 

    board[0][0] = 1;
    updateBoard();
    checkWin();
}

function clickTile(x,y) {

    if (LOCK()) { return; }
    if (turn == 1) {
        board[x][y] = turn;
        turn = 2;
    } else {
        board[x][y] = turn;
        turn = 1;
    }
    
    updateBoard();
    checkWin();
}