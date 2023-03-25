const c2 = "#e60202";
const c4 = "#cf0202";
const c8 = "#b50202";
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

let board = [[2, 4, 8, 16],
             [32, 64, 128, 256],
             [512, 1024, 2048, 4096],
             [8192, 16384, 0, 0]];

let oldBoard = "";

window.onload = () => {
    spawnTile();
    spawnTile();
    oldBoard = "";
}

updateTiles = () => {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {

            const id = ElementId(x + "" + y);

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
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 4:
                    id.style.backgroundColor = c4;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 8:
                    id.style.backgroundColor = c8;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 16:
                    id.style.backgroundColor = c16;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 32:
                    id.style.backgroundColor = c32;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 64:
                    id.style.backgroundColor = c64;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 128:
                    id.style.backgroundColor = c128;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 256:
                    id.style.backgroundColor = c256;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 512:
                    id.style.backgroundColor = c512;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 1024:
                    id.style.backgroundColor = c1024;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 2048:
                    id.style.backgroundColor = c2048;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 4096:
                    id.style.backgroundColor = c4096;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 8192:
                    id.style.backgroundColor = c8192;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                case 16384:
                    id.style.backgroundColor = c16384;
                    id.style.color = "rgb(200,200,200,1)";
                    break;
                default:
                    id.style.backgroundColor = "rgb(0,0,0)"
                    id.style.color = "rgb(200,200,200,1)";
                
            }
        }
    }
}

boardIsOpen = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return true;
            }
        }
    }
    console.log("Board not open");
    return false;
}

spawnTile = () => {
    if (!boardIsOpen) {
        console.log("Board is full");
        return;
    }

    let x,y;

    do {
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);
    } while (board[x][y] != 0);

    if (Math.random() > 0.75) {
        board[x][y] = 4;
    } else {
        board[x][y] = 2;
    }
    oldBoard = JSON.stringify(board);
    updateTiles();
}

right = () => {
    for (let row = 0; row < 4; row++) {
        let arr = removeZeros(board[row]);
        let i = arr.length-1;
        let j = arr.length-2;

        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
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
        
        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
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

        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
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

        while (arr[j] != undefined) {
            if (arr[i] == arr[j]) {
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


// function prob() {
//     let two = 0;
//     let four = 0;
//     for (let i = 0; i < 10000; i++) {
//         const num = (Math.floor(Math.random()*2)+1)*2;
//         if (num == 2) {
//             two++;
//         }
//         if (num == 4) {
//             four++;
//         }
//     }
//     console.log("2: " + two);
//     console.log("4: " + four);
// }