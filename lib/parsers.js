const parseNumber = (str) => str.replace(/[^\d]/g, "");

function parseTicketIDs(str) {
  const result = /[.\s]*([\d]+)\s+([\d-]+)/g.exec(str);

  if (result) {
    const base = result[1];
    const ids = result[2].split("-");

    return ids.map(n => `${base} ${n}`);
  } else {
    return [];
  }

}

function parseSeats(str) {
  return str.split(",").map(s => s.trim());
}

function parseDateTime(str) {
  const result = /\D*(\d{1,2}[\/-]\d{1,2}[\/-]\d{4}).*\s(\d{1,2}\:\d{1,2}).*/g.exec(str);

  if (result) {
    const date = result[1].split(/[-\/]/g).reverse().join("-");
    const time = result[2];
    return new Date(`${date}T${time}:00`);
  } else {
    return null;
  }
}

function parseTicketCreationDate(col_1) {
  const dt = col_1[col_1.length-3]
  return parseDateTime(dt);
}

function parsePageText({col_1, col_2}) {
  const created = parseTicketCreationDate(col_1);
  const origin = col_1[1];
  const destination = col_1[3];
  const passenger_name = col_2[1].replace("Sr(a). ", "");
  const passenger_id = parseNumber(col_2[2]);
  const ticket_ids = parseTicketIDs(col_2[3]);
  const bus_id = parseNumber(col_2[4]);
  const seats = parseSeats(col_2[7]);
  const depart_time = parseDateTime(col_2[9]);
  const arrive_time = parseDateTime(col_2[12]);

  return {
    created,
    origin,
    destination,
    passenger_name,
    passenger_id,
    ticket_ids,
    bus_id,
    seats,
    depart_time,
    arrive_time,
  };
}

function parsePages(pages) {
  return pages.map(parsePageText);
}

module.exports = {
  parseNumber,
  parsePageText,
  parsePages,
  parseTicketIDs,
  parseSeats,
  parseDateTime,
  parseTicketCreationDate,
};

