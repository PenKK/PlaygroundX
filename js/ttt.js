function startTTT() {

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
    
    ElementId("tttCover").style.opacity = 0;
    ElementId("tttCover").style.visibility = "hidden";
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