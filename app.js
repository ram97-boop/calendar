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

function printWhitespaceDates(datesContainer) {
    const whitespaces = getThisMonthFirstDay();

    for (let i = 0; i < whitespaces; ++i) {
        let emptyP = document.createElement("p");
        datesContainer.appendChild(emptyP);
    }
}

function printDates() {
    const datesContainer = document.getElementById("days-of-month");
    const nrOfDays = monthStrings[today.getMonth()][1];

    printWhitespaceDates(datesContainer);

    for (let i = 1; i <= nrOfDays; ++i) {
        let date = document.createElement("p");
        date.textContent = `${i}`;
        datesContainer.appendChild(date);
    }
}

printMonthAndYear();
printDates();

module.exports = {
    getMonthAndYearToday,
    getThisMonthFirstDay
}
