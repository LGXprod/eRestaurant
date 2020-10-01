const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: Number,
  capacity: Number,
  isAvailable: Boolean,
  location: String,
});

const Table = mongoose.model("Table", tableSchema);

const createNewTable = (formData) => {
  return new Promise((resolve, reject) => {});
};

const findAvailableTables = () => {
  return new Promise((resolve, reject) => {
    Table.find({ isAvailable: true }, function (err, tables) {
      if (err) {
        console.log(err);
        reject(err);
      }

      console.log(tables);

      resolve(tables);
    });
  });
};

const updateTableAvailabilty = (tableNumber, availability) => {
  return new Promise((resolve, reject) => {
    Table.findOneAndUpdate(
      { tableNumber: tableNumber },
      { isAvailable: availability },
      { new: true },
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

const bookTable = (tableNumber) => {
  return new Promise((resolve, reject) => {
    updateTableAvailabilty(tableNumber, false)
      .then(() => {
        resolve();
      })
      .catch((err) => console.log(err));
  });
};

const cancelBookedTable = (tableNumber) => {
  return new Promise((resolve, reject) => {
    updateTableAvailabilty(tableNumber, true)
      .then(() => {
        resolve();
      })
      .catch((err) => console.log(err));
  });
};

const getTableNumber = (table_id) => {
  return new Promise((resolve, reject) => {
    Table.findById(table_id, function (err, table) {
      if (err) reject(err);

      console.log("table", table);

      if (table != null) {
        resolve(table.tableNumber);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = {
  createNewTable: createNewTable,
  findAvailableTables: findAvailableTables,
  bookTable: bookTable,
  cancelBookedTable: cancelBookedTable,
  getTableNumber: getTableNumber,
};
