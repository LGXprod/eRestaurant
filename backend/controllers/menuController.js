const menu = require("../models/menu");

module.exports = (app, upload) => {
  app.get("/Menu", (req, res) => {
    menu
      .getMenu(req.query.category)
      .then((menu) => {
        res.json(menu);
      })
      .catch((err) => console.log(err));
  });

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
