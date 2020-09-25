const menu = require("../models/menu");

module.exports = (app, upload) => {
  app.post("/Menu/Item", upload.single("itemImg"), (req, res) => {
    menu.updateMenu(req.body).then(() => {
      res.sendStatus(200);
    }).catch(err => console.log(err));
  });
}