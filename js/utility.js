document.addEventListener("keydown", pageKeyDown, false);

function pageKeyDown(e) {
    if(e.keyCode==72) {
        window.location.href = "index.html";
    }
}

function reset() {
    location.reload();
}

function notification(message) {
    ElementId("noti").style.opacity = 1;
    ElementId("notiText").innerHTML = message;
    ElementId("noti").style.webkitAnimationPlayState = "running";

    setTimeout(function() {
        ElementId("noti").style.opacity = 0;
    }, 4000);

    resetAnimation("noti", "notificationEnterClass");
}

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

function ElementId(id) {
    return document.getElementById(id);
}