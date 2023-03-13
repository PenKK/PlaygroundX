document.addEventListener("keydown", pageKeyDown, false);

function pageKeyDown(e) {
    // alert(e.keyCode);
    if (event.ctrlKey) {
        return;
    }
    //General controls across all pages
    switch(e.keyCode) {
        case 72: //H
            window.location.href = "index.html";
            return;
        case 82: //R
            location.reload();
            return;
        case 67: //C
            window.location.href = "controls.html";
            return;
        case 65: //A
            if (event.shiftKey) {
                location.href = "achievements.html";
            }
            break;
    }

    //Page specific controls

    if (document.URL.endsWith("index.html")) {
        switch(e.keyCode) {
            case 49: 
                location.href = "guessing-game.html";
                break;
            case 50:
                location.href = "rock-paper-scissors.html";
                break;
            case 51:
                location.href = "tic-tac-toe.html";
                break;
            case 52:
                location.href = "2048.html";
                break;
        }
    } else 

    if (document.URL.endsWith("rock-paper-scissors.html")) {
        switch(e.keyCode) {
            case 49:
                play(0);
                break;
            case 50:
                play(1);
                break;
            case 51:
                play(2);
                break;
        }
    } else 

    if (document.URL.endsWith("tic-tac-toe.html") || document.URL.endsWith("tic-tac-toe-ai.html")) {
        switch(e.keyCode) { //Numpad keys
            case 36:
                clickTile(0,0);
                aiTriggerKeyboard();
                return;
            case 38:
                clickTile(0,1);
                aiTriggerKeyboard();
                return;
            case 33:
                clickTile(0,2);
                aiTriggerKeyboard();
                return;
            case 37:
                clickTile(1,0);
                aiTriggerKeyboard();
                return;
            case 12:
                clickTile(1,1);
                aiTriggerKeyboard();
                return;
            case 39:
                clickTile(1,2);
                aiTriggerKeyboard();
                return;
            case 35:
                clickTile(2,0);
                aiTriggerKeyboard();
                return;
            case 40:
                clickTile(2,1);
                aiTriggerKeyboard();
                return;
            case 34:
                clickTile(2,2);
                aiTriggerKeyboard();
                return;
            case 13:
                startGame();
                return;
        }
        return;
    } else 

    if (document.URL.endsWith("2048.html")) {
        switch(e.keyCode) {
            case 87:
                move("up");
                return;
            case 38:
                move("up");
                return;
            case 65:
                left();
                return;
            case 37:
                left();
                return;
            case 83:
                move("down");
                return;
            case 40:
                move("down");
                return;
            case 68:
                right();
                return;
            case 39:
                right()
                return;
            case 220:
                spawnTile();
                return;
        }
    }
}