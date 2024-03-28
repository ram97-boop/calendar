const app = require("../app");

test("returns today's month", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-03-01"));

    const actual = app.getMonthAndYearToday();
    const expected = "Mars 2024";

    expect(actual).toBe(expected);
});

test("return day of the week of current month's 1st day", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-03-24"));

    const actual = app.getThisMonthFirstDay();
    const expected = 4; // Friday

    expect(actual).toBe(expected);
});