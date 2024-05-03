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

test("don't increment month if month on display is 1 year from now", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-05-01"));
    const date = new Date("2025-05-01");

    app.incrementMonth(date);

    const actual = date.toISOString();
    const expected = "2025-05-01T00:00:00.000Z";

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
    for (date of dates) {
        actual.push(app.getYearMonthString(date));
    }
    const expected = ["2024-04", "2024-11"];

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
    for (date of dates) {
        app.getMonthAndYearToday(date);
        actual.push(app.getThisMonthFirstDay());
    }
    const expected = [4, 0, 2, 6];

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
    for (year of years) {
        actual.push(app.getEasterDate(year));
    }
    const expected = [
        new Date("1818-03-22"),
        new Date("1943-04-25"),
        new Date("1961-04-02"),
        new Date("2024-03-31"),
        new Date("2025-04-20"),
        new Date("2035-03-25")
    ];

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
    ];

    const actual = []
    for (easter of easterDates) {
        actual.push(app.getGoodFridayDate(easter));
    }
    const expected = [
        new Date("1818-03-20"),
        new Date("1943-04-23"),
        new Date("1961-03-31"),
        new Date("2024-03-29"),
        new Date("2025-04-18"),
        new Date("2035-03-23")
    ];

    expect(actual).toEqual(expected);
});

test("get Holy Saturday from Easter date", () => {
    const easterDates = [
        new Date("1818-03-22"),
        new Date("1943-04-25"),
        new Date("1961-04-02"),
        new Date("2024-03-31"),
        new Date("2025-04-20"),
        new Date("2035-03-25")
    ];

    const actual = []
    for (easter of easterDates) {
        actual.push(app.getHolySaturdayDate(easter));
    }
    const expected = [
        new Date("1818-03-21"),
        new Date("1943-04-24"),
        new Date("1961-04-01"),
        new Date("2024-03-30"),
        new Date("2025-04-19"),
        new Date("2035-03-24")
    ];

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
    for (easter of easterDates) {
        actual.push(app.getEasterMondayDate(easter));
    }
    const expected = [
        new Date("1818-03-23"),
        new Date("1943-04-26"),
        new Date("1961-04-03"),
        new Date("2024-04-01"),
        new Date("2025-04-21"),
        new Date("2035-03-26")
    ];

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
    for (easter of easterDates) {
        actual.push(app.getAscensionDayDate(easter));
    }
    const expected = [
        new Date("1951-05-03"),
        new Date("1961-05-11"),
        new Date("2024-05-09"),
        new Date("2025-05-29"),
        new Date("2035-05-03")
    ];

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
    for (easter of easterDates) {
        actual.push(app.getPentecostSundayDate(easter));
    }
    const expected = [
        new Date("1951-05-13"),
        new Date("1961-05-21"),
        new Date("2024-05-19"),
        new Date("2025-06-08"),
        new Date("2035-05-13")
    ];

    expect(actual).toEqual(expected);
});

test("get Midsummer date", () => {
    const years = [
        "1943",
        "1961",
        "2024",
        "2025",
        "2035"
    ];

    const actual = [];
    for (year of years) {
        actual.push(app.getMidsummerDate(year));
    }
    const expected = [
        new Date("1943-06-26"),
        new Date("1961-06-24"),
        new Date("2024-06-22"),
        new Date("2025-06-21"),
        new Date("2035-06-23"),
    ];

    expect(actual).toEqual(expected);
});

test("get Midsummer's Eve from Midsummer date", () => {
    const midsummers = [
        new Date("1943-06-26"),
        new Date("1961-06-24"),
        new Date("2024-06-22"),
        new Date("2025-06-21"),
        new Date("2035-06-23"),
    ];

    const actual = [];
    for (midsummer of midsummers) {
        actual.push(app.getMidsummersEveDate(midsummer));
    }
    const expected = [
        new Date("1943-06-25"),
        new Date("1961-06-23"),
        new Date("2024-06-21"),
        new Date("2025-06-20"),
        new Date("2035-06-22"),
    ];

    expect(actual).toEqual(expected);
});

test("get All Saints' Day", () => {
    const years = [
        "1954",
        "2024",
        "2025",
        "2035"
    ];

    const actual = []
    for (year of years) {
        actual.push(app.getAllSaintsDayDate(year));
    }
    const expected = [
        new Date("1954-11-06"),
        new Date("2024-11-02"),
        new Date("2025-11-01"),
        new Date("2035-11-03")
    ];

    expect(actual).toEqual(expected);
});

test("set holidays as closed days", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-04-25"));

    const actual = app.getThisAndNextYearsHolidays({});
    const expected = {
        "2024-01": [1, 6],
        "2024-03": [29, 30, 31],
        "2024-04": [1],
        "2024-05": [1, 9, 19],
        "2024-06": [6, 21, 22],
        "2024-11": [2],
        "2024-12": [24, 25, 26, 31],
        "2025-01": [1, 6],
        "2025-04": [18, 19, 20, 21],
        "2025-05": [1, 29],
        "2025-06": [8, 6, 20, 21],
        "2025-11": [1],
        "2025-12": [24, 25, 26, 31]
    };

    expect(actual).toEqual(expected);
});

