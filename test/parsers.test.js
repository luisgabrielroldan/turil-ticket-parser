const parsers = require("../lib/parsers");

test("parseDateTime", () => {
  expect(parsers.parseDateTime("El 16/12/2018 a las 12:30"))
    .toEqual(new Date("2018-12-16T12:30:00"));

  expect(parsers.parseDateTime("El 16/12/2018 arribo previsto a las 17:35"))
    .toEqual(new Date("2018-12-16T17:35:00"));
});

test("parseTicketCreationDate", () => {
  const col = [
    "06-12-2018 12:42",
    "5373230",
    "EBROU"
  ];
 
  expect(parsers.parseTicketCreationDate(col))
    .toEqual(new Date("2018-12-06T12:42:00"));
});

test("parseTicketIDs", () => {
  expect(parsers.parseTicketIDs("901 123123"))
    .toEqual(["901 123123"]);

  expect(parsers.parseTicketIDs("901 123123-321654"))
    .toEqual(["901 123123", "901 321654"]);
});

test("parseSeats", () => {
  expect(parsers.parseSeats("12"))
    .toEqual(["12"]);

  expect(parsers.parseSeats("12, 13"))
    .toEqual(["12", "13"]);
});
