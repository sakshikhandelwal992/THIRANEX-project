function saveGoals(goals) {
    localStorage.setItem("goals", JSON.stringify(goals));
}

function loadGoals() {
    return JSON.parse(localStorage.getItem("goals")) || [];
}