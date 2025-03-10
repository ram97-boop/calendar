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
    return monthOnDisplay.getDay() - 1; // Make monday have index 0.
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

    printWhitespaceDates(datesContainer);

    for (let i = 1; i <= nrOfDays; ++i) {
        let date = document.createElement("p");
        date.textContent = `${i}`;
        datesContainer.appendChild(date);
    }
}

function clearDates() {
    const datesContainer = document.getElementById("days-of-month");

    while (datesContainer.lastChild) {
        datesContainer.removeChild(datesContainer.lastChild);
    }
}

function makeButtonsChangeMonth() {
    const leftButton = document.getElementById("prev-month");
    const rightButton = document.getElementById("next-month");

    leftButton.addEventListener("click", () => {
        const today = new Date();
        if (monthOnDisplay.getMonth() > today.getMonth()
            || monthOnDisplay.getFullYear() > today.getFullYear()) {
            decrementMonth(monthOnDisplay);
            clearDates();
            printMonthAndYear(monthOnDisplay); // monthOnDisplay is decremented
            printDates();
        }
    });

    rightButton.addEventListener("click", () => {
        incrementMonth(monthOnDisplay);
        clearDates();
        printMonthAndYear(monthOnDisplay);
        printDates();
    });
}

printMonthAndYear(new Date()); // print today
printDates();
makeButtonsChangeMonth();

module.exports = {
    getMonthAndYearToday,
    getThisMonthFirstDay,
    incrementMonth,
    decrementMonth,
    updateFebruaryNrOfDays,
    monthStrings
}
