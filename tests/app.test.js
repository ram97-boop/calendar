const app = require("../app");

test("returns today's month", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-03-01"));

    const actual = app.getMonthAndYearToday(new Date());
    const expected = "Mars 2024";

    expect(actual).toBe(expected);
});

test("return day of the week of current month's 1st day", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-03-24"));

    const actual = app.getThisMonthFirstDay();
    const expected = 4; // Friday

    expect(actual).toBe(expected);
});

test("increment date's month by 1", () => {
    const date = new Date("2024-03-29");

    app.incrementMonth(date);

    const actual = date.getMonth();
    const expected = 3; // April

    expect(actual).toBe(expected);
});

test("increment year when incrementing December month", () => {
    const date = new Date("2024-12-29");

    app.incrementMonth(date);

    const actual = date.toISOString();
    const expected = "2025-01-29T00:00:00.000Z";

    expect(actual).toBe(expected);
});

test("decrement date's month by 1", () => {
    const date = new Date("2024-06-29");

    app.decrementMonth(date);

    const actual = date.getMonth();
    const expected = 4;

    expect(actual).toBe(expected);
});

test("don't decrement month if it's today's month", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-03-29"));
    const date = new Date("2024-03-29");

    app.decrementMonth(date);

    const actual = date.getMonth();
    const expected = 2;

    expect(actual).toBe(expected);
});

test("get 29 days for February in leap year", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-02-09"));

    app.getMonthAndYearToday(new Date);

    const actual = app.monthStrings[1][1];
    const expected = 29;

    expect(actual).toBe(expected);
});

test("get 'YYYY-MM' format from Date object", () => {
    const dates = [
        new Date("2024-04-12"),
        new Date("2024-11-01")
    ];

    const actual = [];
    const expected = ["2024-04", "2024-11"];
    for (date of dates) {
        actual.push(app.getYearMonthString(date));
    }

    expect(actual).toEqual(expected);
});

test("get correct 0-indexed day for various start dates", () => {
    const dates = [
        new Date("2024-03-02"),
        new Date("2024-04-02"),
        new Date("2024-05-02"),
        new Date("2026-02-02")
    ];

    const actual = [];
    const expected = [4, 0, 2, 6];

    for (date of dates) {
        app.getMonthAndYearToday(date);

        actual.push(app.getThisMonthFirstDay());
    }

    expect(actual).toEqual(expected);
});

test("get the date for Easter", () => {
    const years = [
        "1818",
        "1943",
        "1961",
        "2024",
        "2025",
        "2035"
    ];

    const actual = [];
    const expected = [
        new Date("1818-03-22"),
        new Date("1943-04-25"),
        new Date("1961-04-02"),
        new Date("2024-03-31"),
        new Date("2025-04-20"),
        new Date("2035-03-25")
    ];

    for (year of years) {
        actual.push(app.getEasterDate(year));
    }

    expect(actual).toEqual(expected);
});

test("get date for Good Friday from Easter date", () => {
    const easterDates = [
        new Date("1818-03-22"),
        new Date("1943-04-25"),
        new Date("1961-04-02"),
        new Date("2024-03-31"),
        new Date("2025-04-20"),
        new Date("2035-03-25")
    ]

    const actual = []
    const expected = [
        new Date("1818-03-20"),
        new Date("1943-04-23"),
        new Date("1961-03-31"),
        new Date("2024-03-29"),
        new Date("2025-04-18"),
        new Date("2035-03-23")
    ];

    for (easter of easterDates) {
        actual.push(app.getGoodFridayDate(easter));
    }

    expect(actual).toEqual(expected);
});

test("get Easter Monday from Easter date", () => {
    const easterDates = [
        new Date("1818-03-22"),
        new Date("1943-04-25"),
        new Date("1961-04-02"),
        new Date("2024-03-31"),
        new Date("2025-04-20"),
        new Date("2035-03-25")
    ]

    const actual = []
    const expected = [
        new Date("1818-03-23"),
        new Date("1943-04-26"),
        new Date("1961-04-03"),
        new Date("2024-04-01"),
        new Date("2025-04-21"),
        new Date("2035-03-26")
    ];

    for (easter of easterDates) {
        actual.push(app.getEasterMondayDate(easter));
    }

    expect(actual).toEqual(expected);
});

test("get Ascension Day from Easter date", () => {
    const easterDates = [
        new Date("1951-03-25"),
        new Date("1961-04-02"),
        new Date("2024-03-31"),
        new Date("2025-04-20"),
        new Date("2035-03-25")
    ]

    const actual = []
    const expected = [
        new Date("1951-05-03"),
        new Date("1961-05-11"),
        new Date("2024-05-09"),
        new Date("2025-05-29"),
        new Date("2035-05-03")
    ];

    for (easter of easterDates) {
        actual.push(app.getAscensionDayDate(easter));
    }

    expect(actual).toEqual(expected);
});

test("get Pentecost Sunday from Easter date", () => {
    const easterDates = [
        new Date("1951-03-25"),
        new Date("1961-04-02"),
        new Date("2024-03-31"),
        new Date("2025-04-20"),
        new Date("2035-03-25")
    ]

    const actual = []
    const expected = [
        new Date("1951-05-13"),
        new Date("1961-05-21"),
        new Date("2024-05-19"),
        new Date("2025-06-08"),
        new Date("2035-05-13")
    ];

    for (easter of easterDates) {
        actual.push(app.getPentecostSundayDate(easter));
    }

    expect(actual).toEqual(expected);
});