const mongoose = require("mongoose");
const table = require("../models/table");
const crypto = require("crypto");
const customer = require("./customer");

const bookingSchema = new mongoose.Schema({
  tableID: String,
  customerID: String,
  bookingDate: Date, //not sure if date is correct type//
  order: [String],
  invoiceDate: Date, // array of menu item ids
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

const updateOrder = (order_id, menuItems) => {
  return new Promise((resolve, reject) => {
    Order.findOneAndUpdate(
      { order_id },
      { order: menuItems, invoiceDate: new Date() },
      function (err) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve();
      }
    );
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

const getBookings = (dateIN, typeOfCheck) => {
  return new Promise((resolve, reject) => {
    const date = new Date(dateIN);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    console.log("set hour", hour);

    function dateAloneCheck() {
      return new Promise((resolve, reject) => {
        Booking.find({}, function (err, bookings) {
          if (err) reject(err);
          let bookings_dates = [];
          for (let booking of bookings) {
            if (
              booking.bookingDate.getMonth() == month &&
              booking.bookingDate.getFullYear() == year &&
              booking.bookingDate.getDate() == day
            ) {
              bookings_dates.push(booking);
            }
          }
          resolve(bookings_dates);
        });
      });
    }

    //date alone check
    dateAloneCheck().then((bookings) => {
      if (typeOfCheck == 0) {
        resolve(bookings);
      } else {
        let booking_times = [];
        for (let booking of bookings) {
          console.log("h", booking.bookingDate.getHours(), "h2", hour);
          console.log("m", booking.bookingDate.getMinutes(), "m2", minute);
          if (
            booking.bookingDate.getMinutes() == minute &&
            booking.bookingDate.getHours() == hour
          ) {
            booking_times.push(booking);
          }
        }
        console.log("bookings", booking_times);
        resolve(booking_times);
      }
    });
  });
};

module.exports = {
  createNewBooking,
  deleteBooking,
  getBookings,
  updateOrder,
};
