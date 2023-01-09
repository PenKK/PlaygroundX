//Utility

function ElementId(id) {
    return document.getElementById(id);
}

//H for home

document.addEventListener("keydown", pageKeyDown, false);

function pageKeyDown(e) {
    if(e.keyCode==72) {
        window.location.href = "index.html";
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