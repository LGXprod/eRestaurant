const mongoose = require("mongoose");
const table = require("../models/table");
const session = require("../models/session");

const bookingSchema = new mongoose.Schema({
  tableIDs: [String],
  customerID: String,
  bookingDate: Date, //not sure if date is correct type//
  order: [Object], // array of menu item ids
  invoiceDate: Date,
});

const Booking = mongoose.model("Booking", bookingSchema);

const createNewBooking = (session_id, tableIDs, bookingDate) => {
  return new Promise((resolve, reject) => {
    console.log("s", session_id);
    session
      .getUserBySession(session_id)
      .then((customer) => {
        console.log("date", bookingDate);
        if (customer.customer_id !== null) {
          const newBooking = new Booking({
            customerID: customer.customer_id,
            tableIDs,
            bookingDate,
          });

          console.log("newBooking", newBooking);

          newBooking.save(function (err) {
            if (err) reject(err);

            resolve();
          });
        }
      })
      .catch((err) => console.log(err));
  });
};

const updateBookingTable = (booking_id, table_id) => {
  return new Promise((resolve, reject) => {
    timeDifference(booking_id).then((canChange) => {
      if (canChange) {
        Booking.findOneAndUpdate(
          { booking_id },
          { tableID: table_id },
          function (err) {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(true);
          }
        );
      } else {
        resolve(false);
      }
    });
  });
};

const updateBookingTime = (booking_id, bookingDate) => {
  return new Promise((resolve, reject) => {
    timeDifference(booking_id).then((canChange) => {
      if (canChange) {
        Booking.findOneAndUpdate(
          { booking_id },
          { bookingDate: bookingDate },
          function (err) {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(true);
          }
        );
      } else {
        resolve(false);
      }
    });
  });
};

const updateOrder = (session_id, order) => {
  return new Promise((resolve, reject) => {
    session
      .getUserBySession(session_id)
      .then((customer) => {
        Booking.findOneAndUpdate(
          { customerID: customer.customer_id },
          { order, invoiceDate: new Date() },
          function (err) {
            if (err) reject(err);
            resolve();
          }
        );
      })
      .catch((err) => console.log(err));
  });
};

const deleteBooking = (booking_id) => {
  return new Promise((resolve, reject) => {
    timeDifference(booking_id).then((canChange) => {
      if (canChange) {
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
      } else {
        resolve(false);
      }
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

const timeDifference = (booking_id) => {
  return new Promise((resolve, reject) => {
    Booking.findById(booking_id, function (err, booking) {
      if (err) reject(err);
      console.log((booking.bookingDate - new Date()) / 3600000);
      resolve((booking.bookingDate - new Date()) / 3600000 > 24);
    });
  });
};

module.exports = {
  createNewBooking,
  deleteBooking,
  getBookings,
  updateBookingTable,
  updateBookingTime,
  updateOrder,
  timeDifference,
};
