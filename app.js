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

module.exports = {
    getMonthAndYearToday,
    getThisMonthFirstDay
}