window.onload = () => {
    if ((localStorage.getItem("MASTER_GUESSER") == "true") && (localStorage.getItem("SWEEPER_OR_SWEEPED") == "true") && (localStorage.getItem("TIC_TAC_TOE_LOSER") == "true")) {
        ElementId("achievementsButton").style.backgroundSize = "300%";
    }
}