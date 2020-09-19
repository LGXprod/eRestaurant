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

const managementSchema = new mongoose.Schema({
  salary: Number,
  notes: String
});

const chefSchema = new mongoose.Schema({
  salary: Number,
  chefType: String,
});

const customerServiceSchema = new mongoose.Schema({
  wage: Number,
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
    roleName: String,
    management: managementSchema,
    chef: chefSchema,
    customerService: customerServiceSchema,
  }
});

const staff = mongoose.model("Staff", staffSchema, "staff");
const bankDetails = mongoose.model("BankDetail", bankDetailsSchema);
const management = mongoose.model("Management", managementSchema);
const chef = mongoose.model("Chef", chefSchema);
const customerService = mongoose.model(
  "CustomerService",
  customerServiceSchema
);

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

    const role = formData.role;
    delete formData.role;

    switch (role) {
      case "management":
        formData.role = {
          roleName: "management",
          management: new management({
            salary: 0,
            notes: "",
          }),
        }
        break;
      case "customer service":
        formData.role = {
          roleName: "customer service",
          customerService: new customerService({
            wage: 0
          }),
        }
        break;
      case "chef":
        formData.role = {
          roleName: "chef",
          chef: new chef({
            salary: 0,
            chefType: ""
          }),
        }
        break;
    }

    formData._id = formData.username;
    delete formData.username;
    console.log(formData);

    const staffMem = new staff(formData);

    staffMem.save(function (err) {
      console.log(err)
      if (err) reject(err);

      resolve();
    });
  });
};

const checkLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    staff.findById(username, function (err, staffMem) {
      if (err) reject(err);

      if (staffMem != null) {
        if (staffMem.password === password) {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  });
};

module.exports = {
  createNewStaffMem,
  checkLogin,
};
