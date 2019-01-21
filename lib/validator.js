function isValidTicket(pages) {
  return pages.map(({col_1, col_2}) => {
    return col_1[0] === "Salida" &&
      col_1[2] === "Llegada" &&
      col_2[0] === "Su Pasaje" &&
      col_2[1].includes("Sr(a).") &&
      col_2[6] === "ASIENTO(S):" &&
      col_2[13].includes("www.turil.com.uy")
    ;
    })
    .every(r => r);
}

function validateTicket(data) {
  if (isValidTicket(data)) {
    return data;
  } else {
    return Promise.reject(new Error("Invalid ticket file"));
  }
}

module.exports = {
  validateTicket,
  isValidTicket,
}
