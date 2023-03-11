board = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 0]];

checkAllTiles = () => {
    for (let x = 1; x < 5; x++) {
        for (let y = 1; y < 5; y++) {
            if (board[x][y] == 0) {}
        }
    }
}

randomEmptyTile = () => {
    let tileX;
    let tileY;
    do {
        tileX = Math.floor(Math.random() * 4);
        tileY = Math.floor(Math.random() * 4);
        attempts++
    } while (board[tileX][tileY] != 0) board[tileX][tileY]
}

spawnTiles = () => {
    
}
move = () => {

}