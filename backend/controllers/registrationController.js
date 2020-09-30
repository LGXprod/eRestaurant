const customer = require("../models/customer");
const staff = require("../models/staff");

module.exports = (app) => {
  app.post("/Registration", (req, res) => {
    switch (req.body.role) {
      case "customer":
        customer
          .createNewCustomer(req.body)
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            if (err === "Missing props" || err === "Invalid props") {
              res.sendStatus(422);
            } else {
              res.sendStatus(500);
            }
          });
        break;
      case "customer service":
        staff.createNewStaffMem(req.body).then(() => {
          res.sendStatus(200);
        }).catch(err => {
          console.log("error:", err._message);
          res.sendStatus(422);
        });
        break;
      case "chef":
        staff.createNewStaffMem(req.body).then(() => {
          res.sendStatus(200);
        }).catch(err => {
          console.log("error:", err._message);
          res.sendStatus(422);
        });
        break;
      case "management":
        staff.createNewStaffMem(req.body).then(() => {
          res.sendStatus(200);
        }).catch(err => {
          console.log("error:", err._message);
          res.sendStatus(422);
        });
        break;
      default:
        res.sendStatus(422);
    }
  });
};
