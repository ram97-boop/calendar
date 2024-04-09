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