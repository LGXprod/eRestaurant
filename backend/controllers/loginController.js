const customer = require("../models/customer");

module.exports = (app) => {
    app.post("/login", (req, res) => {
        customer.checkCustomerLogin(req.body.username, req.body.password).then((isCustomer) => {
            console.log("Correct login:", isCustomer);
        }).catch(err => console.log(err));
    });
}