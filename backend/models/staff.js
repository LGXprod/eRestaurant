const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema({
  accountNum: {
    type: String,
    required: [true, "Missing prop"],
    minlength: [12, "Incorrect number of digits for account number"],
    maxlength: [12, "Incorrect number of digits for account number"],
  },
  BSB: {
    type: String,
    required: [true, "Missing prop"],
    minlength: [6, "Incorrect number of digits for BSB"],
    maxlength: [6, "Incorrect number of digits for BSB"],
  },
  accountName: {
    type: String,
    required: [true, "Missing prop"],
  },
});

const staffSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Missing prop"],
    unqiue: true,
  },
  password: {
    type: String,
    required: [true, "Missing prop"],
  },
  fName: {
    type: String,
    required: [true, "Missing prop"],
  },
  sName: {
    type: String,
    required: [true, "Missing prop"],
  },
  TFN: {
    type: String,
    required: [true, "Missing prop"],
    minlength: [8, "Incorrect number of digits for TFN"],
    maxlength: [8, "Incorrect number of digits for TFN"],
  },
  bankDetails: {
    type: bankDetailsSchema,
    required: [true, "Missing prop"],
  },
  email: {
    type: String,
    required: [true, "Missing prop"],
  },
  mobileNum: {
    type: String,
    required: [true, "Missing prop"],
  },
  role: {
    type: String,
    required: [true, "Missing prop"],
  },
});

const staff = mongoose.model("Staff", staffSchema, "staff");
const bankDetails = mongoose.model("BankDetail", bankDetailsSchema);

const createNewStaffMem = (formData) => {
  return new Promise((resolve, reject) => {
    formData.bankDetails = new bankDetails({
      accountNum: formData.accountNum,
      accountName: formData.accountName,
      BSB: formData.BSB,
    });

    delete formData.accountNum;
    delete formData.accountName;
    delete formData.BSB;

    formData._id = formData.username;
    delete formData.username;
    console.log(formData);

    const staffMem = new staff(formData);

    staffMem.save(function (err) {
      if (err) reject(err);

      resolve();
    });
  });
};

module.exports = {
  createNewStaffMem,
};
