const customer = require("../models/customer");
const session = require("../models/session");
const table = require("../models/table");

module.exports = (app) => {
  app.post("/Booking", (req, res) => {
    res.send("hello");
    table
      .findAvailableTables(() => {
        console.log(tables);
      })
      .catch((err) => console.log(err));
  });
};
