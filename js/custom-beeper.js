const durationEl = document.getElementById("durationInput");
const minEl = document.getElementById("minInput");
const maxEl = document.getElementById("maxInput");
const startButton = document.getElementById("startButton");
const beepEstimateEl = document.getElementById("beepEstimate");
const volumeEl = document.getElementById("volume");
const dingSound = new Audio('audio/beep-mono.wav');

document.getElementById("toggle").onclick = toggleTheme;

if (localStorage.getItem("darkTheme") == null) {
    localStorage.setItem("darkTheme", "false");
}

updateTheme();

var on = false;
var startTime = 0;
var darkTheme = false;

startButton.onclick = startBeeper;

minEl.onchange = updateBeepEstimate;
maxEl.onchange = updateBeepEstimate;
durationEl.onchange = updateBeepEstimate;
volumeEl.onchange = updateVolume;

updateVolume();

function updateVolume() {
    dingSound.volume = volumeEl.value / 1000;
}

function updateBeepEstimate() {
    if (minEl.value > maxEl.value) {
        return;
    }

    let estimate = Math.floor(durationEl.value / ((maxEl.value - -minEl.value) / 2)) - 1;

    let text = "Enter valid values";
    if (isFinite(estimate) && estimate != 0) {
        text = `There will be around ${estimate} beep(s)`;
    } 
    beepEstimateEl.innerText = text;
}

function startBeeper() {
    if (minEl.value > maxEl.value) {
        return;
    }
    console.log("Beeping started");
    on = true;

    startButton.innerText = "Stop";
    startButton.onclick = endBeeper;

    startTime = new Date().getTime();
    beep(getRandDelay());
}

function getRandDelay() {
    return ((maxEl.value - minEl.value) * Math.random() - -minEl.value) * 1000;
}

function beep(delay) {
    setTimeout(() => {
        if (!on) {
            return;
        }
        if (new Date().getTime() - startTime > durationEl.value * 1000) {
            endBeeper();
        } else {
            playDing()
            let newDelay = getRandDelay();
            console.log(`The next beep is in ${newDelay} ms`);
            beep(newDelay);
        }
    }, delay);
}

function endBeeper() {
    on = false;
    console.log("Beeping stopped");
    startButton.innerText = "Start";
    startButton.onclick = startBeeper;
}

function playDing() {
    if (!dingSound.paused) {
        dingSound.currentTime = 0;
    }
    dingSound.play();
}

function toggleTheme() {
    localStorage.setItem("darkTheme", localStorage.getItem("darkTheme") == "true" ? "false" : "true");
    updateTheme();
}

function updateTheme() {
    if (localStorage.getItem("darkTheme") == "true") {
        themeDark();
    } else {
        themeBisque();
    }
}

function themeDark() {
    document.body.style.backgroundColor = "rgb(32, 32, 32)";
}

function themeBisque() {
    document.body.style.backgroundColor = "bisque"
}

