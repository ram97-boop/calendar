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

function getMonthToday() {
    const today = new Date(Date.now());

    return monthStrings[today.getMonth()];
}

function getThisMonthFirstDay() {
    const today = new Date(Date.now());

    today.setDate(1);
    return today.getDay();
}

module.exports = {
    getMonthToday,
    getThisMonthFirstDay
}