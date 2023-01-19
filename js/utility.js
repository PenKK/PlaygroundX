//Utility

function ElementId(id) {
    return document.getElementById(id);
}

function hide(id) {
    ElementId(id).style.visibility = "hidden";
}

function show(id) {
    ElementId(id).style.visibility = "visible";
}

function goTo(location) {
    if (location == 1) {
        window.location.href = "tic-tac-toe-ai.html";
    } else if (location == 0) {
        window.location.href = "tic-tac-toe.html";
    } 
}

//H for home

document.addEventListener("keydown", pageKeyDown, false);

function pageKeyDown(e) {
    if(e.keyCode == 72) {
        window.location.href = "index.html";
    }

    if(e.keyCode == 82) {
        location.reload();
    }
}

//Notification

var notiLock = false;

function notification(message) {
    if (!notiLock) {
        notiLock = true;

        ElementId("noti").style.opacity = 1;
        ElementId("notiText").innerHTML = message;
        ElementId("noti").style.webkitAnimationPlayState = "running";
    
        setTimeout(function() {
            ElementId("noti").style.opacity = 0;
            notiLock = false;
        }, 5000);
    
        resetAnimation("noti", "notificationEnterClass");
    }
    
}

//Animation

function resetAnimation(cls, id) {
    var element = document.getElementById(cls);
    element.classList.remove(id);
    void element.offsetWidth;
    element.classList.add(id);
    // console.log("Class " + cls + " has been reset with animation "+ animation);
}

function runAnimation(id) {
    document.getElementById(id).style.animationPlayState = "running";
}