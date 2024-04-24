const monthStrings = [
    ["Januari", 31],
    ["Februari", 0],
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
let monthOnDisplay;
let fullDays = {};

// for leap days
function updateFebruaryNrOfDays(date) {
    if (date.getMonth() === 1) {
        const febLastDay = new Date(date);
        febLastDay.setMonth(2);
        febLastDay.setDate(0);
        monthStrings[1][1] = febLastDay.getDate();
    }
}

function getMonthAndYearToday(today) {
    monthOnDisplay = new Date(today);
    updateFebruaryNrOfDays(today);
    return `${monthStrings[today.getMonth()][0]} ${today.getFullYear()}`;
}

function getThisMonthFirstDay() {
    monthOnDisplay.setDate(1);
    // Make monday have index 0, and avoid -1 for months starting on a Sunday.
    return (monthOnDisplay.getDay() - 1 + 7) % 7;
}

function incrementMonth(date) {
    date.setMonth(date.getMonth() + 1);
}

function decrementMonth(date) {
    const today = new Date();
    const datesMonth = date.getMonth();
    if (datesMonth > today.getMonth()
        || date.getFullYear() > today.getFullYear()) {
        date.setMonth(datesMonth - 1);
    }
}

function printMonthAndYear(date) {
    const p = document.getElementById("month-and-year");
    p.textContent = getMonthAndYearToday(date);
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
    const nrOfDays = monthStrings[monthOnDisplay.getMonth()][1];

    // clear previously printed dates.
    while (datesContainer.lastChild) {
        datesContainer.removeChild(datesContainer.lastChild);
    }

    printWhitespaceDates(datesContainer);

    for (let i = 1; i <= nrOfDays; ++i) {
        let date = document.createElement("p");
        date.textContent = `${i}`;
        datesContainer.appendChild(date);
    }

    setFullDays(fullDays, monthOnDisplay);
}

function makeButtonsChangeMonth() {
    const leftButton = document.getElementById("prev-month");
    const rightButton = document.getElementById("next-month");

    leftButton.addEventListener("click", () => {
        const today = new Date();
        if (monthOnDisplay.getMonth() > today.getMonth()
            || monthOnDisplay.getFullYear() > today.getFullYear()) {
            decrementMonth(monthOnDisplay);
            printMonthAndYear(monthOnDisplay); // monthOnDisplay is decremented
            printDates();
        }
    });

    rightButton.addEventListener("click", () => {
        incrementMonth(monthOnDisplay);
        printMonthAndYear(monthOnDisplay);
        printDates();
    });
}

function getYearMonthString(date) {
    const isoMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${date.getFullYear()}-${isoMonth}`;
}

function addEventListenerForFullDaysMessage() {
    window.addEventListener("message", (event) => {
        console.log("message received");
        fullDays = event.data;
        setFullDays(fullDays, monthOnDisplay);
    });
}

function setFullDays(fullDays, yearAndMonth) {
    const yearAndMonthString = getYearMonthString(yearAndMonth);

    if (yearAndMonthString in fullDays) {
        const whitespaceOffset = getThisMonthFirstDay();

        for (const day of fullDays[yearAndMonthString]) {
            const date = document.querySelector(
                `#days-of-month p:nth-child(${day + whitespaceOffset})`
            );
            date.classList.add("full");
        }
    }
}

function getEasterDate(year) {
    // Anonymous Gregorian algorithm
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1

    const isoMonth = month.toString().padStart(2, "0");
    const isoDay = day.toString().padStart(2, "0");
    return `${year}-${isoMonth}-${isoDay}`;
}

function getGoodFridayDate(easterDate) {
    const goodFriday = new Date(easterDate);
    goodFriday.setDate(goodFriday.getDate() - 2);

    return goodFriday;
}

printMonthAndYear(new Date()); // print today's month and year.
printDates();
makeButtonsChangeMonth();
addEventListenerForFullDaysMessage();

module.exports = {
    monthStrings,
    getMonthAndYearToday,
    getThisMonthFirstDay,
    incrementMonth,
    decrementMonth,
    updateFebruaryNrOfDays,
    getYearMonthString,
    getEasterDate,
    getGoodFridayDate
}
