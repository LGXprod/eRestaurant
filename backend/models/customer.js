const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    _id: String,
    password: String
});

const Customer = mongoose.model("Customer", customerSchema);

const createNewCustomer = (formData) => {
    return new Promise((resolve, reject) => {

    });
}

const checkCustomerLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        Customer.findById(username, function(err, customer) {
            if (err) reject(err);

            console.log(customer);
            
            if (customer == null) {
                resolve(false)
            } else {
                if (customer.password === password) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

module.exports= {
    createNewCustomer: createNewCustomer,
    checkCustomerLogin: checkCustomerLogin
}