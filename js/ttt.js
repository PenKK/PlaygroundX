if (localStorage.getItem("startingMove") == "computer") {
    localStorage.setItem("startingMove", "player");
} else if (localStorage.getItem("startingMove") == "player") {
    localStorage.setItem("startingMove", "computer");
} else {
    localStorage.setItem("startingMove", "player");
    console.log("Turns initialized");
}

var turn = localStorage.getItem("startingMove");
var moveLock = false;

var board = [[0,0,0],
             [0,0,0],
             [0,0,0]]

function rand13() {
    return Math.floor(Math.random()*3);
}

function updateBoard() {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            switch (board[i][y]) {
                case 0:
                    return;
                case 1:
                    ElementId(x + y)
            }
        }
    }
}

function changeTile(x, y, XO, num) { //x, y, x/o, 1/2
    board[x][y] = num
    updateBoard()
}

function startGame() {    
    ElementId("tttCover").style.opacity = 0;
    ElementId("tttCover").style.visibility = "hidden";

    if (turn == "computer") {
        changeTile(rand13(), rand13(), "x", 1);
    }
}

function LOCK() {
    if (moveLock == false) {
        moveLock = true;
        setTimeout(() => {
            moveLock = false;
        }, 1000);
    } else {
        return true;
    }
}

function checkWin() {

}

function one() {

    if (LOCK()) { return; }

    board[0][0] = 1;
    ElementId("x1").style.opacity = 1;
    
    checkWin();
}