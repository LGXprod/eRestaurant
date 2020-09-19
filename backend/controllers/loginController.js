const customer = require("../models/customer");
const session = require("../models/session");
const staff = require("../models/staff");

module.exports = (app) => {
  function createCookie(username, res, idProp) {
    session
      .createSession(username, idProp)
      .then((session_id) => {
        res.json({
          auth: true,
          session_id: session_id,
        });
      })
      .catch((err) => console.log(err));
  }

  app.post("/Login", (req, res) => {
    customer
      .checkCustomerLogin(req.body.username, req.body.password)
      .then((correctLogin) => {
        if (correctLogin) {
          createCookie(req.body.username, res, "customer_id");
        } else {
          staff
            .checkLogin(req.body.username, req.body.password)
            .then((correctLogin) => {
              if (correctLogin) {
                createCookie(req.body.username, res, "staff_id");
              } else {
                res.json({
                  auth: false,
                });
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });
};
