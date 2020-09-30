const mongoose = require("mongoose");
const crypto = require("crypto");

const sessionSchema = mongoose.Schema({
  _id: String,
  customer_id: String,
  staff_id: String,
  createdAt: { type: Date, expires: "60m", default: Date.now },
});

const Session = mongoose.model("Session", sessionSchema);

const createSession = (id, idProp) => {
  return new Promise((resolve, reject) => {
    const idObj = {};
    idObj[idProp] = id;

    Session.deleteMany(idObj, function (err) {
      if (err) reject(err);

      const session_id = crypto.randomBytes(16).toString("base64");

      const sessionObj = { _id: session_id };
      sessionObj[idProp] = id;

      const newSession = new Session(sessionObj);

      newSession.save(function (err) {
        if (err) reject(err);

        resolve(session_id);
      });
    });
  });
};

const getByCustomerID = (customer_id) => {
  return new Promise((resolve, reject) => {
    Session.findOne({ customer_id: customer_id }, function (err, session) {
      if (err) reject(err);

      if (session != null) {
        resolve({
          ...session,
          hasSession: true,
        });
      } else {
        resolve({
          hasSession: false,
        });
      }
    });
  });
};

module.exports = {
  getByCustomerID: getByCustomerID,
  createSession: createSession,
};
