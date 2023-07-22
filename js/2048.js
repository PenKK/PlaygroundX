const c2 = "rgb(130, 203, 77)"; 
const c4 = "rgb(251, 220, 123)";
const c8 = "rgb(245, 140, 54)";
const c16 = "rgb(222, 85, 99)";
const c32 = "rgb(239, 100, 160)"; 
const c64 = "rgb(200, 255, 97)";
const c128 = "rgb(80, 200, 255)";
const c256 = "rgb(180, 235, 179)";
const c512 = "rgb(155, 130, 221)";
const c1024 = "rgb(140, 255, 203)";
// const c2048 = "rgb(100, 100, 100)";
const c4096 = "rgb(255, 190, 60)";
const c8192 = "rgb(245, 190, 254)";
const c16384 = "rgb(123, 210, 237)";
const COLOR_LARGE = "#660000";
const TEXT_COLOR = "rgb(0,0,0,1)";
const EMPTY_TILE_COLOR = "rgb(180, 123, 123)"

// let board = [[2, 4, 8, 16],
//              [32, 64, 128, 256],
//              [512, 1024, 2048, 4096],
//              [8192, 16384, 2, 2]];

let board = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]];

let oldBoard = "";
let score = 0;

window.onload = () => {
    ElementId("hsHolder").innerHTML = localStorage.getItem("2048hs");
    spawnTile();
    spawnTile();
    oldBoard = "";
    ElementId("scoreHolder").innerHTML = "2048";
}

if (localStorage.getItem("2048hs") == null) {
    localStorage.setItem("2048hs", 0);
}

updateTiles = () => {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {

            const id = ElementId(x + "" + y);
            id.style.color = TEXT_COLOR;
            id.classList.remove("gradientAnimation");
            id.style.backgroundImage = "none";

            if (board[x][y] != 0) {
                id.innerHTML = board[x][y];
            } else {
                id.innerHTML = "";
                id.style.backgroundColor = EMPTY_TILE_COLOR;
            }

            switch(board[x][y]) {
                case 0:
                    break;
                case 2:
                    id.style.backgroundColor = c2;
                    break;
                case 4:
                    id.style.backgroundColor = c4;
                    break;
                case 8:
                    id.style.backgroundColor = c8;
                    break;
                case 16:
                    id.style.backgroundColor = c16;
                    break;
                case 32:
                    id.style.backgroundColor = c32;
                    break;
                case 64:
                    id.style.backgroundColor = c64;
                    break;
                case 128:
                    id.style.backgroundColor = c128;
                    break;
                case 256:
                    id.style.backgroundColor = c256;
                    break;
                case 512:
                    id.style.backgroundColor = c512;
                    break;
                case 1024:
                    id.style.backgroundColor = c1024;
                    break;
                case 2048:
                    rainbowAnimationEl(id, 4);
                    break;
                case 4096:
                    id.style.backgroundColor = c4096;
                    break;
                case 8192:
                    id.style.backgroundColor = c8192;
                    break;
                case 16384:
                    id.style.backgroundColor = c16384;
                    break;
                default:
                    if (checkValidBoardNumber(board[x][y])) {
                        id.style.backgroundColor = COLOR_LARGE;
                    } else {
                        id.style.backgroundColor = "rgb(0,0,0)";
                        id.style.color = "rgb(255,255,255)";
                        id.innerHTML = id.innerHTML + "?";
                        console.log("Invalid number at row " + (x+1) + " column " + (y+1));
                    }
            
            }
        }
    }
    if (gameEndCheck()) {
        setTimeout(() => {
            endGame();     
        }, 750);
    }
    if (score != 0) {
        ElementId("scoreHolder").innerHTML = score;
    }
    
    storageEvents();
}

checkValidBoardNumber = (num) => {
    if (num == 1) {
        return false;
    }
    if (Math.sqrt(num) % 1 == 0 || Math.sqrt(num*2) % 1 == 0) {
        return true;
    }
    return false
}

spawnTile = () => {
    let x,y;

    let attempts = 0;
    do {
        attempts++;
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);
        if (attempts >= 1000) {
            notification("ERROR: No empty tile found in " + attempts + " attempts, returning function");
            console.log("ERROR: No empty tile found in " + attempts + " attempts, returning function");
            return;
        }
    } while (board[x][y] != 0);

    board[x][y] = 2;

    if (Math.random() >= 0.9) {
        board[x][y] = 4;
    }

    oldBoard = JSON.stringify(board);
    updateTiles();
}

boardIsOpen = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return true;
            }
        }
    }
    return false;
}

gameEndCheck = () => {
    if (boardIsOpen()) {
        return false;
    }
    if (canMoveDirection()) {
        return false;
    }
    return true
}

endGame = () => {
    ElementId("gameCover").style.opacity = 0.9;
    ElementId("buttonSmall").removeAttribute("hidden");
}

canMoveDirection = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            try {
                if (board[i][j] == board[i][j + 1]) { //Horizontal
                    return true;
                }
    
                if (board[i][j] == board[i + 1][j]) { //Verticle
                    return true;
                }
            } catch {}
        }
    }
    return false;
}

check2048 = (num) => {
    if (num == 2048 && localStorage.getItem("2048_COMPLETIONIST") != "true") {
        localStorage.setItem("2048_COMPLETIONIST", true);
        notification("Achievement complete: 2048 Completionist");
    }
}

right = () => {
    for (let row = 0; row < 4; row++) {
        let arr = removeZeros(board[row]);
        let i = arr.length-1;
        let j = arr.length-2;
        let combined = -1;

        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
                if (combined != -1 && arr[i] != combined) {
                    break;
                }
                combined = arr[i];
                score += combined*2;
                arr[j] *= 2;
                arr[i] = 0;
                check2048(combined*2);
            }
            i--;
            j--;
        }

        arr = removeZeros(arr);

        while (arr.length < 4) {
            arr.unshift(0);
        }
        
        fixNaN(arr);
        board[row] = arr;
    }
    if (JSON.stringify(board) != oldBoard) {
        spawnTile();
    }
}

left = () => {
    for (let row = 0; row < 4; row++) {
        let arr = removeZeros(board[row]);
        let i = 0;
        let j = 1;
        let combined = -1;

        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
                if (combined != -1 && arr[i] != combined) {
                    break;
                }
                combined = arr[i];
                score += combined*2;
                arr[j] *= 2;
                arr[i] = 0;
                check2048(combined*2);
            }
            i++;
            j++;
        }

        arr = removeZeros(arr);
        fixNaN(arr);
        board[row] = arr;
    }
    if (JSON.stringify(board) != oldBoard) {
        spawnTile();
    }
}

up = () => {
    let newBoard = [[]];
    for (let column = 0; column < 4; column++) {
        let arr = [];

        for (let row = 0; row < 4; row++) {
            arr.push(board[row][column]);
        }
        arr = removeZeros(arr);
        
        let i = 0;
        let j = 1;
        let combined = -1;

        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
                if (combined != -1 && arr[i] != combined) {
                    break;
                }
                combined = arr[i];
                score += combined*2;
                arr[j] *= 2;
                arr[i] = 0;
                check2048(combined*2);
            }
            i++;
            j++;
        }

        arr = removeZeros(arr);
        fixNaN(arr);
        newBoard[column] = arr;
    }
    board = transpose2DArray(newBoard);

    if (JSON.stringify(board) != oldBoard) {
        spawnTile();
    }
}

down = () => {
    let newBoard = [[]];

    for (let column = 0; column < 4; column++) {
        let arr = [];

        for (let row = 0; row < 4; row++) {
            arr.push(board[row][column]);
        }
        arr = removeZeros(arr);
        
        let i = arr.length-1;
        let j = arr.length-2;
        let combined = -1;

        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
                if (combined != -1 && arr[i] != combined) {
                    break;
                }
                combined = arr[i];
                score += combined*2;
                arr[j] *= 2;
                arr[i] = 0;
                check2048(combined*2);
            }
            i--;
            j--;
        }

        arr = removeZeros(arr);

        while (arr.length < 4) {
            arr.unshift(0);
        }
        
        fixNaN(arr);
        newBoard[column] = arr;
    }
    board = transpose2DArray(newBoard);

    if (JSON.stringify(board) != oldBoard) {
        spawnTile();
    }
}

removeZeros = (arr) => {
    return arr.filter(num => num != 0);
}

fixNaN = (arr) => {
    for (let i = 0; i < 4; i++) {
        if (isNaN(arr[i])) {
            arr[i] = 0;
        }
    }
}

transpose2DArray = (arr) => { //shoutout to chat gpt
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
        }
    }
    return arr;
}

storageEvents = () => {
    if (score > localStorage.getItem("2048hs")) {
        ElementId("hsHolder").innerHTML = score;
        ElementId("hsHolder").style.color = "brown";
        localStorage.setItem("2048hs", score);
    }
    if (score >= 3000 && localStorage.getItem("2048_AMBASSADOR") != "true") {
        localStorage.setItem("2048_AMBASSADOR", true);
        notification("Achievement complete: 2048 Ambassador");
    }
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
    return evt.touches;
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            left();
        } else {
            right();
        }                       
    } else {
        if ( yDiff > 0 ) {
            up();
        } else { 
            down();
        }                                                                 
    }

    xDown = null;
    yDown = null;                                             
};