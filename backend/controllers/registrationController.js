const customer = require("../models/customer");

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
        break;
      case "chef":
        break;
      case "management":
        break;
      default:
        res.sendStatus(422);
    }
  });
};
