const c2 = "#8f4949";
const c4 = "#963838";
const c8 = "#b02020";
const c16 = "#9c0202";
const c32 = "#850101";
const c64 = "#6e0000";
const c128 = "#540000";
const c256 = "#420101";
const c512 = "#2e0000";
const c1024 = "#1f0000";
const c2048 = "#120000";
const c4096 = "#100000";
const c8192 = "#0c0000";
const c16384 = "#080000";
const textColor = "rgb(200,200,200,1)";

// let board = [[2, 4, 8, 16],
//              [32, 64, 128, 256],
//              [512, 1024, 2048, 4096],
//              [8192, 16384, 0, 0]];

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

updateTiles = () => {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {

            const id = ElementId(x + "" + y);
            id.style.color = textColor;

            if (board[x][y] != 0) {
                id.innerHTML = board[x][y];
            } else {
                id.innerHTML = "";
                id.style.backgroundColor = "rgb(180, 123, 123)";
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
                    id.style.backgroundColor = c2048;
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
                    id.style.backgroundColor = "rgb(0,0,0)"
            
            }
        }
    }
    if (gameEndCheck()) {
        setTimeout(() => {
            endGame();     
        }, 750);
    }
    ElementId("scoreHolder").innerHTML = score;
    if (score > localStorage.getItem("2048hs")) {
        ElementId("hsHolder").innerHTML = score;
        ElementId("hsHolder").style.color = "brown";
        localStorage.setItem("2048hs", score);
    }
}

spawnTile = () => {
    let x,y;

    do {
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);
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
    if (canMoveHoriVert()) {
        return false;
    }
    return true
}

endGame = () => {
    ElementId("gameCover").style.opacity = 0.9;
}

canMoveHoriVert = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            try {
                if (board[i][j] == board[i][j + 1]) { //Horizontal
                    return true;
                }
    
                if (board[i][j] == board[i + 1][j]) { //Verticle
                    return true;
                }
            } catch {
                // console.log("Error caught in horizontal and verticle check");
                // console.log("i: " + i);
                // console.log("j: " + j);
            }
        }
    }
    return false;
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
                arr[j] *= 2;
                arr[i] = 0;
                score += combined*2;
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
        let combined = -1

        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
                if (combined != -1 && arr[i] != combined) {
                    break;
                }
                combined = arr[i];
                score += combined*2;
                arr[j] *= 2;
                arr[i] = 0;
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
                score += combined*2
                arr[j] *= 2;
                arr[i] = 0;
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

function transpose2DArray(arr) { //shoutout to chat gpt
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
        }
    }
    return arr;
}

if (localStorage.getItem("2048hs") == null) {
    localStorage.setItem("2048hs", 0);
}