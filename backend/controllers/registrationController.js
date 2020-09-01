const customer = require("../models/customer");

module.exports = (app) => {
  console.log("here");
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
      case "customer service":
      case "chef":
      case "management":
      default:
        res.sendStatus(422);
    }
  });
};
