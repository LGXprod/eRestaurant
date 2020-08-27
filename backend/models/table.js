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
      if (err) reject(err);

      console.log(tables);
      
      resolve(tables);

    });
  });
}

module.exports= {
    createNewTable: createNewTable,
    findAvailableTables: findAvailableTables
}