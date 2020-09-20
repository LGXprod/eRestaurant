const mongoose = require("mongoose");
const table = require("../models/table");

const bookingSchema = new mongoose.Schema({
    _id: String,
    tableID: String,
    customerID: String,
    bookingDate: Date //not sure if data is correct type//
});

const Booking = mongoose.model("Booking", bookingSchema);

const createNewBooking = (customer_id, table_id, bookingDate) => {
    return new Promise((resolve, reject) => {
      
      const booking_id = crypto.randomBytes(16).toString("base64");

      const newBooking = new Booking({
        _id:         booking_id,
        customer_id: customer_id,
        table_id:    table_id,
        bookingDate: bookingDate
      });

      newBooking.save(function (err) {
        if (err) reject(err);

        resolve(booking_id);
      });
    
      table.bookTable(table.getTableNumber(table_id));
    });
}

module.exports = {
  createNewBooking: createNewBooking
};