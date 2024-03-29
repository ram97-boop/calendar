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
let monthOnDisplay = new Date(today);

function getMonthAndYearToday() {
    return `${monthStrings[monthOnDisplay.getMonth()][0]} ${monthOnDisplay.getFullYear()}`;
}

function getThisMonthFirstDay() {
    monthOnDisplay.setDate(1);
    return monthOnDisplay.getDay() - 1; // Make monday have index 0.
}

function incrementMonth(date) {
    date.setMonth(date.getMonth() + 1);
}

function decrementMonth(date) {
    datesMonth = date.getMonth();
    if (datesMonth > today.getMonth()
        || date.getFullYear() > today.getFullYear()) {
        date.setMonth(datesMonth - 1);
    }
}

function printMonthAndYear() {
    const p = document.getElementById("month-and-year");
    p.textContent = getMonthAndYearToday();
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
        if (monthOnDisplay.getMonth() > today.getMonth()
            || monthOnDisplay.getFullYear() > today.getFullYear()) {
            decrementMonth(monthOnDisplay);
            clearDates();
            printMonthAndYear();
            printDates();
        }
    });

    rightButton.addEventListener("click", () => {
        incrementMonth(monthOnDisplay);
        clearDates();
        printMonthAndYear();
        printDates();
    });
}

printMonthAndYear();
printDates();
makeButtonsChangeMonth();

module.exports = {
    getMonthAndYearToday,
    getThisMonthFirstDay,
    incrementMonth,
    decrementMonth
}
