const mongoose = require("mongoose");
const table = require("../models/table");
const crypto = require("crypto");
const customer = require("./customer");

const bookingSchema = new mongoose.Schema({
  _id: String,
  tableID: String,
  customerID: String,
  bookingDate: Date, //not sure if date is correct type//
});

const Booking = mongoose.model("Booking", bookingSchema);

const createNewBooking = (customer_id, table_id, bookingDate) => {
  return new Promise((resolve, reject) => {
    const booking_id = crypto.randomBytes(16).toString("base64");

    table.getTableNumber(table_id).then(tableNumber => {
      table.bookTable(tableNumber).then(() => {

        const newBooking = new Booking({
          _id: booking_id,
          customerID: customer_id,
          tableID: table_id,
          bookingDate: bookingDate,
        });
    
        console.log("newBooking", newBooking);
    
        newBooking.save(function (err) {
          if (err) reject(err);
    
          resolve();
        });

      }).catch(err => console.log(err));
    }).catch(err => console.log(err));

  });
};

const deleteBooking = async (booking_id) => {
  const table_id = await Booking.findById(booking_id).exec();

  console.log("table_id", table_id);

  table.getTableNumber(booking.tableID).then(tableNumber => {
    table.cancelBookedTable(tableNumber).then(() => {
      resolve();
    });
  }).catch(err => console.log(err));
};

module.exports = {
  createNewBooking: createNewBooking,
  deleteBooking: deleteBooking,
};
