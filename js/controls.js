//This code is really bad and stupid why did I make it all on one page idc anymore and ima just use dont judge 

document.addEventListener("keydown", pageKeyDown, false);

function pageKeyDown(e) {
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
    }

    //Page specific controls

    if (document.URL.search("index.html") != -1) {
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

    if (document.URL.search("rock-paper-scissors.html") != -1) {
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

    if (document.URL.search("tic-tac-toe.html") != -1 || document.URL.search("tic-tac-toe-ai.html") != -1) {
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

    if (document.URL.search("2048.html") != -1) {
        switch(e.keyCode) {
            case 87:
                up();
                return;
            case 38:
                up();
                return;
            case 65:
                left();
                return;
            case 37:
                left();
                return;
            case 83:
                down();
                return;
            case 40:
                down();
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
    } else

    if (document.URL.search("calculator.html") != -1 && document.URL.search("quadratic") == -1) {
        if (typing) {
            return;
        }
        switch(e.keyCode) {
            case 49:
                inputNumber(1);
                return;
            case 50:
                inputNumber(2);
                return;
            case 51:
                inputNumber(3);
                return;
            case 52:
                inputNumber(4);
                return;
            case 53:
                inputNumber(5);
                return;
            case 54:
                if (event.shiftKey) {
                    inputOpperand('^');
                } else {
                    inputNumber(6);
                }
                return;
            case 55:
                inputNumber(7);
                return;
            case 56:
                if (event.shiftKey) {
                    inputOpperand("x");
                } else {
                    inputNumber(8);
                }
                return;
            case 57:
                inputNumber(9);
                return;
            case 48:
                inputNumber(0);
                return;
            case 88:
                inputOpperand("x");
                return;
            case 13:
                calculate();
                return;
            case 27:
                clearDisplay();
                return;
            case 67:
                clearDisplay();
                return;
            case 191:
                inputOpperand("/");
                return;
            case 83:
                squareroot();
            case 187:
                if (event.shiftKey) {
                    inputOpperand("+");
                } else {
                    calculate();
                }
                
                return;
            case 189:
                inputOpperand("-");
                return;
            case 8:
                backspace();
                return;
            case 190:
                decimal();
        }
    } else

    if (document.URL.search("ear-trainer.html") != -1) {
        switch (e.keyCode) {
            case 13: 
                correctAnswer(); 
                return;
            case 76: 
                noteToPlay.play(); 
                return;
            case 67: 
                checkAnswer('C'); 
                return;
            case 68: 
                checkAnswer('D'); 
                return;
            case 69: 
                checkAnswer('E'); 
                return;
            case 70: 
                checkAnswer('F'); 
                return;
            case 71: 
                checkAnswer('G'); 
                return;
            case 65: 
                checkAnswer('A'); 
                return;
            case 66: 
                checkAnswer('B'); 
                return;
        }
    }
}