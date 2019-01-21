#!/usr/bin/node

const { extractText } = require("./lib/extractor");
const { parsePages } = require("./lib/parsers");
const { validateTicket } = require("./lib/validator");
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log({success: false, message: "Invalid argument"});
  return;
}

extractText(args[0])
  .then(validateTicket)
  .then(parsePages)
  .then(tickets => {
    return {
      success: true,
      tickets
    };
  })
  .catch(({message}) => {
    return {
      success: false,
      error: message
    };
  })
  .then(result => console.log(result));

