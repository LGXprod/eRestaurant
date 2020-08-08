const customer = require("../models/customer");
const session = require("../models/session");

module.exports = (app) => {
  app.post("/Login", (req, res) => {
    customer
      .checkCustomerLogin(req.body.username, req.body.password)
      .then((correctLogin) => {
        if (correctLogin) {
          session
            .createSession(req.body.username)
            .then((session_id) => {
              res.json({
                auth: true,
                session_id: session_id,
              });
            })
            .catch((err) => console.log(err));
        } else {
          res.json({
            auth: false,
          });
        }
      })
      .catch((err) => console.log(err));
  });
};
