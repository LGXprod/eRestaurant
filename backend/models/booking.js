const mongoose = require("mongoose");
const table = require("../models/table");
const crypto = require("crypto");
const customer = require("./customer");

const bookingSchema = new mongoose.Schema({
  tableID: String,
  customerID: String,
  bookingDate: Date, //not sure if date is correct type//
});

const Booking = mongoose.model("Booking", bookingSchema);

const createNewBooking = (customer_id, table_id, bookingDate) => {
  return new Promise((resolve, reject) => {
    table
      .getTableNumber(table_id)
      .then((tableNumber) => {
        table
          .bookTable(tableNumber)
          .then(() => {
            const newBooking = new Booking({
              customerID: customer_id,
              tableID: table_id,
              bookingDate: bookingDate,
            });

            console.log("newBooking", newBooking);

            newBooking.save(function (err) {
              if (err) reject(err);

              resolve();
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

const deleteBooking = (booking_id) => {
  return new Promise((resolve, reject) => {
    Booking.findByIdAndDelete(booking_id, { _id: 0, tableID: 1 }, function (
      err,
      tableID
    ) {
      if (err) reject(err);

      table
        .getTableNumber(tableID.tableID)
        .then((tableNumber) => {
          table.cancelBookedTable(tableNumber).then(() => {
            resolve();
          });
        })
        .catch((err) => console.log(err));
      resolve();
    });
  });
};

module.exports = {
  createNewBooking: createNewBooking,
  deleteBooking: deleteBooking,
};
