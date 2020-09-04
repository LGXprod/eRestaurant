const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    _id: String,
    tableNumber: Number,
    capacity: Number,
    isAvailable: Boolean,
    location: String
});

const Table = mongoose.model("Table", tableSchema);

const createNewTable = (formData) => {
    return new Promise((resolve, reject) => {

    });
}

const findAvailableTables = () => {
  return new Promise((resolve, reject) => {
    Table.find({isAvailable: true}, function(err, tables) {
      if (err)
      {
        console.log(err);
        reject(err);
      }

      console.log(tables);
      
      resolve(tables);

    });
  });
}

const updateTableAvailabilty = (tableNumber, availability) => {
  return new Promise((resolve, reject) => {
    Table.findOneAndUpdate({tableNumber: tableNumber}, {isAvailable: availability}, function(err, table) {
      if (err)
      {
        console.log(err);
        reject(err);
      }
      console.log("Updated availability: ");
      console.log(table.isAvailable);
      
      resolve(table);

    });
  });
}

const bookTable = (tableNumber) => {
  return new Promise((resolve, reject) => {
    updateTableAvailabilty(tableNumber, false);
  });
}

const cancelBookedTable = (tableNumber) => {
  return new Promise((resolve, reject) => {
    updateTableAvailabilty(tableNumber, true);
  });
}

const getTableNumber = (table_id) => {
  return new Promise((resolve, reject) => {
    Table.findOne({ table_id: table_id }, function (err, table) {
      if (err) reject(err);

      if (table != null) {
        resolve({
          ...table,
          tableNumber: tableNumber,
        });
      } else {
        resolve({
          tableNumber: null,
        });
      }
    });
  });
};

module.exports= {
    createNewTable: createNewTable,
    findAvailableTables: findAvailableTables,
    bookTable: bookTable,
    cancelBookedTable: cancelBookedTable,
    getTableNumber: getTableNumber
}