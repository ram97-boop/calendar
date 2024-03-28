const monthStrings = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December"
];

function getMonthAndYearToday() {
    const today = new Date(Date.now());

    return `${monthStrings[today.getMonth()]} ${today.getFullYear()}`;
}

function getThisMonthFirstDay() {
    const today = new Date(Date.now());

    today.setDate(1);
    return today.getDay();
}

function printMonthAndYear() {
    const container = document.getElementById("calendar-container");
    container.firstElementChild.textContent = getMonthAndYearToday();
}

printMonthAndYear();

module.exports = {
    getMonthAndYearToday,
    getThisMonthFirstDay
}
