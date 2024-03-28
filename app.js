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
const today = new Date(Date.now());

function getMonthAndYearToday() {
    return `${monthStrings[today.getMonth()][0]} ${today.getFullYear()}`;
}

function getThisMonthFirstDay() {
    today.setDate(1);
    return today.getDay() - 1; // Make monday have index 0.
}

function printMonthAndYear() {
    const container = document.getElementById("calendar-container");
    container.firstElementChild.textContent = getMonthAndYearToday();
}

function printWhitespaceDates(daysContainer) {
    const whitespaces = getThisMonthFirstDay();

    for (let i = 0; i < whitespaces; ++i) {
        let emptyP = document.createElement("p");
        daysContainer.appendChild(emptyP);
    }
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
