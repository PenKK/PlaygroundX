let fullBoard = false;
let oldBoard;
board = [[0, 0, 2, 2],
         [0, 0, 0, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0]];

window.onload = () => {
    updateTiles();
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
                case 2:
                    id.style.backgroundColor = "#A30010";
                    id.style.color = "rgb(0,0,0,1)";
                    break;
                case 4:
                    id.style.backgroundColor = "#7A000C";
                    id.style.color = "rgb(0,0,0,1)";
                    break;
                case 8:
                    id.style.backgroundColor = "#1B020C";
                    id.style.color = "rgb(0,0,0,1)";
                case 16:
                    id.style.backgroundColor = "#BC121C";
                    id.style.color = "rgb(0,0,0,1)";

                
            }
        }
    }
}

spawnTile = () => {
    let attempts = 0;
    let tileX = -1;
    let tileY = -1;
    do {
        tileX = Math.floor(Math.random() * 4);
        tileY = Math.floor(Math.random() * 4);
        if (attempts++ > 150) {
            console.log("Board considered full");
            fullBoard = true;
            return;
        } 
    } while (board[tileX][tileY] != 0);

    board[tileX][tileY] = (Math.floor(Math.random()*2)+1)*2
    updateTiles();
}

spawnTile = () => {
    let attempts = 0;
    let tileX = -1;
    let tileY = -1;
    do {
        tileX = Math.floor(Math.random() * 4);
        tileY = Math.floor(Math.random() * 4);
        if (attempts++ > 150) {
            console.log("Board considered full");
            fullBoard = true;
            return;
        } 
    } while (board[tileX][tileY] != 0);

    board[tileX][tileY] = (Math.floor(Math.random()*2)+1)*2
    updateTiles();
}

right = () => {
    for (let row = 0; row < 4; row++) {
        let arr = removeZeros(board[row]);
        let i = 0;
        let j = 1;
        
        while (arr[i] != arr[j]) {
            i++;
            j++;
        }

        arr[j] *= 2;
        arr[i] = 0;
        
        fixNaN(arr);
        arr = removeZeros(arr);
        
        while (arr.length < 4) {
            arr.unshift(0);
        }
        
        board[row] = arr;
        
    }
    spawnTile();
}

left = () => {
    for (let row = 0; row < 4; row++) {
        let arr = removeZeros(board[row]);
        let i = 0;
        let j = 1;
        
        while (arr[i] != arr[j]) {
            i++;
            j++;
        }

        arr[i] *= 2;
        arr[j] = 0;
        
        arr = removeZeros(arr)
        fixNaN(arr);
        
        board[row] = arr;
        
    }
    if (board == oldBoard) {
        console.log("End")
    }
    
    spawnTile();
}

removeZeros = (arr) => {
    // var i = arr.length;
    // while (i--) {
    //     if (arr[i] === 0) {
    //         arr.splice(i, 1);
    //     }
    // }
    // return arr;
    return arr.filter(num => num != 0);
}

fixNaN = (arr) => {
    for (let i = 0; i < 4; i++) {
        try {
            if (isNaN(arr[i])) {
                arr[i] = 0;
            }
        } catch (e) {

        }
    }
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