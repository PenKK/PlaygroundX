document.addEventListener("keydown", pageKeyDown, false);

function pageKeyDown(e) {
    if(e.keyCode==72) {
        window.location.href = "index.html";
    }
}

function reset() {
    location.reload();
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