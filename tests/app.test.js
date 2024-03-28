const app = require("../app");

test("returns today's month", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-03-01"));

    const actual = app.getMonthToday();
    const expected = "Mars";

    expect(actual).toBe(expected);
})