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
    booking
      .createNewBooking(
        req.body.customer_id,
        new mongoose.Types.ObjectId(req.body.table_id),
        decodeURIComponent(req.body.date)
      )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  });

  app.delete("/Booking", (req, res) => {
    // frontend must uri encode the booking_id when before using it as a url parameter
    booking
      .deleteBooking(
        new mongoose.Types.ObjectId(decodeURIComponent(req.query.booking_id))
      )
      .then((hasUpdated) => {
        if (hasUpdated) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => console.log(err));
  });

  app.get("/Booking", (req, res) => {
    // frontend must uri encode the booking_id when before using it as a url parameter
    // console.log("x", (new Date (decodeURIComponent(req.query.date))).getHours());
    // console.log(req.query.check_time);
    booking
      .getBookings(
        new Date(decodeURIComponent(req.query.date)),
        req.query.check_time
      )
      .then((bookings) => {
        res.json(bookings);
      })
      .catch((err) => console.log(err));
  });

  app.post("/Booking/MenuItems", (req, res) => {
    booking
      .updateOrder(JSON.parse(req.body.menuItemIDs))
      .then(() => {})
      .catch((err) => console.log(err));
  });

  app.post("/ChangeBooking/Time", (req, res) => {
    console.log("x:", req.body.date)
    booking
      .updateBookingTime(req.body.booking_id, new Date(req.body.date))
      .then((hasUpdated) => {
        if (hasUpdated) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => console.log(err));
  });

  app.post("/ChangeBooking/Table", (req, res) => {

    booking
      .updateBookingTime(req.body.booking_id, req.body.table_id)
      .then((hasUpdated) => {
        if (hasUpdated) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => console.log(err));
  });
};
