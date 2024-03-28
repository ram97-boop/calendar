const monthStrings = [
    ["Januari", 31],
    ["Februari", 28],
    ["Mars", 31],
    ["April", 30],
    ["Maj", 31],
    ["Juni", 30],
    ["Juli", 31],
    ["Augusti", 31],
    ["September", 30],
    ["Oktober", 31],
    ["November", 30],
    ["December", 31]
];

function getMonthAndYearToday() {
    const today = new Date(Date.now());

    return `${monthStrings[today.getMonth()][0]} ${today.getFullYear()}`;
}

function getThisMonthFirstDay() {
    const today = new Date(Date.now());

    today.setDate(1);
    return today.getDay();
}

// function printMonthAndYear() {
//     const container = document.getElementById("calendar-container");
//     container.firstElementChild.textContent = getMonthAndYearToday();
// }

// printMonthAndYear();

module.exports = {
    getMonthAndYearToday,
    getThisMonthFirstDay
}
