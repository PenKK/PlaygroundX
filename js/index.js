window.onload = () => {
    if (localStorage.getItem("visited") == null) {
        notification("Press H to return to the home page at any time!")
        localStorage.setItem("visited", "true");
    }

    if ((localStorage.getItem("MASTER_GUESSER") == "true") && (localStorage.getItem("SWEEPER_OR_SWEEPED") == "true") && (localStorage.getItem("TIC_TAC_TOE_LOSER") == "true")) {
        ElementId("achievementsButton").style.backgroundSize = "300%";
    }
}
