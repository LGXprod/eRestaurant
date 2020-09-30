const session = require("../models/session");
const customer = require("../models/customer");
const staff = require("../models/staff");

module.exports = (app) => {
  app.get("/User", (req, res) => {
    session.getCustBySession(decodeURIComponent(req.query.session_id)).then((user) => {
      if (user == null) {
        res.sendStatus(404);
      } else if (user.isCustomer) {
        customer.getCustomerByID(user.customer_id).then((customer) => {
          res.json(customer);
        }).catch(err => console.log(err));
      } else {
        staff.getStaffByID(user.staff_id).then((staffMem) => {
          res.json(staffMem);
        }).catch(err => console.log(err));
      }
    });
  });
}