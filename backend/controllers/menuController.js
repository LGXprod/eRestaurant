const menu = require("../models/menu");
const fs = require("fs");

module.exports = (app, upload) => {
  app.post("/Menu/Item", upload.single("img"), (req, res) => {
    menu
      .updateMenu(
        req.body.name,
        req.body.price,
        req.body.desc,
        req.body.category,
        req.file
      )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  });
};
