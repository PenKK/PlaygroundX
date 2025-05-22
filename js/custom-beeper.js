const durationEl = document.getElementById("durationInput");
const minEl = document.getElementById("minInput");
const maxEl = document.getElementById("maxInput");
const startButton = document.getElementById("startButton");
const beepEstimateEl = document.getElementById("beepEstimate");
const volumeEl = document.getElementById("volume");
const dingSound = new Audio("audio/beep-mono.wav");
const changeEl = document.getElementById("minChange");
const changeTextWarn = document.getElementById("minChangeWarning");

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
changeEl.onchange = checkChange;

updateVolume();

function updateVolume() {
    dingSound.volume = volumeEl.value / 1000;
}

function checkChange() {
    let maxChange = (maxEl.value - minEl.value)/minEl.value * 100;
    
    if (maxChange - 70 < changeEl.value) {
        changeTextWarn.innerText = `The maximum change is ${maxChange}%, ${changeEl.value}% is too high and the app may malfunction`
    } else {
        changeTextWarn.innerText = ``;
    }

    return maxChange;
}

function updateBeepEstimate() {
    checkChange();
    if (minEl.value > maxEl.value) {
        return;
    }

    let estimate = Math.floor(durationEl.value / ((maxEl.value - -minEl.value) / 2)) - 1;

    let text = "Enter valid values";
    if (isFinite(estimate)) {
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
    beep(getRandDelay(0));

    setTimeout(() => {
        endBeeper();
    }, durationEl.value * 1000);
}

function getRandDelay(oldDelay) {
    let delay = ((maxEl.value - minEl.value) * Math.random() - -minEl.value) * 1000;
    let changePercent = Math.abs(delay - oldDelay) / oldDelay;

    console.log(`Calculated change is ${changePercent * 100}`);

    if (checkChange() < 5) {
        return delay;
    }
    if (changePercent > changeEl.value / 100) {
        return delay;
    } else {
        return getRandDelay(oldDelay);
    }
}

function beep(delay) {
    setTimeout(() => {
        if (new Date().getTime() - startTime > durationEl.value * 1000 || !on) {
            return;
        } else {
            playDing();
            try {
                let newDelay = getRandDelay(delay);
                console.log(`The next beep is in ${newDelay} ms`);
                beep(newDelay);
            } catch(e) {
                alert("Minimum change was too high, unable to find a delay");
            }
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
    document.body.style.backgroundColor = "bisque";
}
