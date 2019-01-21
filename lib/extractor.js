const pdfreader = require("pdfreader");

function sortRows(rows) {
  return Object.keys(rows)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
    .map((y) => (rows[y] || []).join(' '));
}

function sortAndPush(pages, rows_col1, rows_col2) {
  pages.push({
    col_1: sortRows(rows_col1),
    col_2: sortRows(rows_col2),
  });
}

function extractText(filename) {
  return new Promise(function(resolve, reject) {
    var pages = []
    var rows_col1 = {}, rows_col2 = {};
    var current_page = 0;
    var reader = new pdfreader.PdfReader();
    
    reader.parseFileItems(filename, function(err, item) {
      if (item && item.file) { return; }

      if (!item) {
        sortAndPush(pages, rows_col1, rows_col2);
        resolve(pages);
      } else if (item.page) {

        if (current_page > 0) {
          sortAndPush(pages, rows_col1, rows_col2);
        }

        current_page = item.page;

        rows_col1 = {};
        rows_col2 = {};
      } else if (item.text) {
        if (item.x < 20) {
          (rows_col1[item.y] = rows_col1[item.y] || []).push(item.text);
        } else {
          (rows_col2[item.y] = rows_col2[item.y] || []).push(item.text);
        }
      }
    });
  });
}

module.exports = {
  extractText
}
