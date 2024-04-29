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
let closedDays = {
    "2024-04": [2],
};
let unclosedDays = {
    "2024-04": [1], // open during 2024's Easter Monday
    "2024-12": [24, 25]
};

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
    const limit = new Date();
    limit.setFullYear(limit.getFullYear() + 1);
    if (date.getFullYear() < limit.getFullYear()
        || date.getMonth() < limit.getMonth()) {
        date.setMonth(date.getMonth() + 1);
    }
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

    setUnavailableDays(fullDays, monthOnDisplay, "full");
    setUnavailableDays(closedDays, monthOnDisplay, "blocked");
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
        setUnavailableDays(fullDays, monthOnDisplay, "full");
        // setUnavailableDays(closedDays, monthOnDisplay, "blocked");
    });
}

function setUnavailableDays(dates, yearAndMonth, classAttribute) {
    const yearAndMonthString = getYearMonthString(yearAndMonth);

    if (yearAndMonthString in dates) {
        const whitespaceOffset = getThisMonthFirstDay();

        for (const day of dates[yearAndMonthString]) {
            const date = document.querySelector(
                `#days-of-month p:nth-child(${day + whitespaceOffset})`
            );
            date.classList.add(classAttribute);
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
    return new Date(`${year}-${isoMonth}-${isoDay}`);
}

function getGoodFridayDate(easterDate) {
    // subtract 2 days in unix timestamp format.
    return new Date(easterDate * 1 - (86400000 * 2));
}

function getHolySaturdayDate(easterDate) {
    // subtract 1 day in unix timestamp format.
    return new Date(easterDate * 1 - 86400000);
}

function getEasterMondayDate(easterDate) {
    // add a day to unix timestamp formatted date
    return new Date(easterDate * 1 + 86400000);
}

function getAscensionDayDate(easterDate) {
    return new Date(easterDate * 1 + (86400000 * 39));
}

function getPentecostSundayDate(easterDate) {
    return new Date(easterDate * 1 + (86400000 * 49));
}

function getMidsummerDate(year) {
    let date = new Date(`${year}-06-20`);

    for (let i = 0; i < 7; ++i) {
        date = new Date(date * 1 + 86400000); // next day
        if (date.getDay() === 6) { // if Saturday
            return date;
        }
    }
}

function getMidsummersEveDate(midsummerDate) {
    return new Date(midsummerDate * 1 - 86400000);
}

function getAllSaintsDayDate(year) {
    let date = new Date(`${year}-10-31`);

    for (let i = 0; i < 7; ++i) {
        date = new Date(date * 1 + 86400000); // next day
        if (date.getDay() === 6) { // if Saturday
            return date;
        }
    }
}

function putHolidaysInClosedDays() {
    const currentYear = (new Date(Date.now())).getFullYear();
    const years = [
        currentYear,
        currentYear + 1 // next year
    ];

    for (year of years) {
        const easter = getEasterDate(year);
        const midsummer = getMidsummerDate(year);
        const holidays = [
            new Date(`${year}-01-01`), // New Year's Day
            new Date(`${year}-01-06`), // Epiphany
            getGoodFridayDate(easter),
            getHolySaturdayDate(easter),
            easter,
            getEasterMondayDate(easter),
            new Date(`${year}-05-01`), // 1st of May
            getAscensionDayDate(easter),
            getPentecostSundayDate(easter),
            new Date(`${year}-06-06`), // Sweden's national day
            getMidsummersEveDate(midsummer),
            midsummer,
            getAllSaintsDayDate(year),
            new Date(`${year}-12-24`), // Christmas Eve
            new Date(`${year}-12-25`), // Christmas
            new Date(`${year}-12-26`), // Boxing Day
            new Date(`${year}-12-31`), // New Year's Eve
        ];

        let key = "";
        let month = "";
        for (holiday of holidays) {
            month = (holiday.getMonth() + 1).toString().padStart(2, "0");
            key = `${year}-${month}`;
            if (!(unclosedDays[key]
                && unclosedDays[key].includes(holiday.getDate()))
            ) {
                if (closedDays[key]) {
                    closedDays[key].push(holiday.getDate());
                }
                else {
                    closedDays[key] = [holiday.getDate()];
                }
            }
        }
    }
}

putHolidaysInClosedDays();
printMonthAndYear(new Date()); // print today's month and year.
printDates();
makeButtonsChangeMonth();
addEventListenerForFullDaysMessage();

module.exports = {
    monthStrings,
    closedDays,
    getMonthAndYearToday,
    getThisMonthFirstDay,
    incrementMonth,
    decrementMonth,
    updateFebruaryNrOfDays,
    getYearMonthString,
    getEasterDate,
    getGoodFridayDate,
    getHolySaturdayDate,
    getEasterMondayDate,
    getAscensionDayDate,
    getPentecostSundayDate,
    getMidsummerDate,
    getMidsummersEveDate,
    getAllSaintsDayDate,
    putHolidaysInClosedDays,
}
