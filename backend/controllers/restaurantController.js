const restaurant = require("../models/restaurant");

module.exports = (app, upload) => {
  app.post("/Restaurant", upload.single("img"), (req, res) => {
    restaurant
      .createRestaurant(
        req.body.name,
        req.file,
        JSON.parse(req.body.currentStaff)
      )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  });

  app.get("/Restaurant", (req, res) => {
    restaurant
      .getRestaurantByName(req.query.name)
      .then((restaurants) => {
        res.json(restaurants);
      })
      .catch((err) => console.log(err));
  });
};
