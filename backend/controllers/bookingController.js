const customer = require("../models/customer");
const session = require("../models/session");
const table = require("../models/table");
const booking = require("../models/booking");
const mongoose = require("mongoose");

module.exports = (app) => {
  // app.post("/Booking", (req, res) => {
  //   res.send("hello");
  //   table
  //     .findAvailableTables(() => {
  //       console.log(tables);
  //     })
  //     .catch((err) => console.log(err));
  // });

  app.post("/Booking", (req, res) => {
    const table_id = new mongoose.Types.ObjectId(req.body.table_id);
    console.log(typeof table_id)
    booking.createNewBooking(req.body.customer_id, table_id, req.body.date).then(() => {
      res.sendStatus(200);
    }).catch(err => console.log(err));
  });

  app.delete("/Booking", (req, res) => {
    console.log("Booking ->", req.query.booking_id)
    booking.deleteBooking(req.query.booking_id).then(() => {
      res.status(200);
    }).catch(err => console.log(err));
  });
};
