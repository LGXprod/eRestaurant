const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  _id: String,
  password: String,
});

const Customer = mongoose.model("Customer", customerSchema);

const createNewCustomer = (formData) => {
  return new Promise((resolve, reject) => {
    let hasInvalidProp = false;

    const requiredProps = {
      username: false,
      password: false,
      fName: false,
      sName: false,
      email: false,
      mobileNum: false,
      role: false
    };

    // check props are valid
    for (let prop in formData) {
      if (requiredProps[prop] != null) {
        requiredProps[prop] = true;
      } else {
        hasInvalidProp = true;
        break;
      }
    }

    // check props aren't missing
    if (hasInvalidProp) {
      reject("Invalid props");
    } else {
      for (let prop in requiredProps) {
        if (requiredProps[prop]) {
          const customer = new Customer(formData);

          customer.save(err => {
            if (err) reject(err);
            resolve();
          });
        } else {
          reject("Missing props");
        }
      }
    }
  });
};

const checkCustomerLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    Customer.findById(username, function (err, customer) {
      if (err) reject(err);

      console.log(customer);

      if (customer == null) {
        resolve(false);
      } else {
        if (customer.password === password) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

module.exports = {
  createNewCustomer: createNewCustomer,
  checkCustomerLogin: checkCustomerLogin,
};
