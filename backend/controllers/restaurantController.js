const restaurant = require("../models/restaurant");
const table = require("../models/table");

module.exports = (app, upload) => {
  app.post("/Restaurant", upload.single("img"), (req, res) => {
    restaurant
      .createRestaurant(
        req.body.name,
        req.file,
        JSON.parse(req.body.currentStaff),
        req.body.category
      )
      .then((restaurant_id) => {
        table.createNewTable({
          tableNumber: req.body.tables.tableNum,
          capacity: req.body.tables.numSeats,
          outside: req.body.tables.outside,
          available: false,
          restaurant_id
        }).then(() => {
          res.sendStatus(200);
        }).catch(err => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  app.post("/Restaurant/Layout", upload.single("img"), (req, res) => {
    restaurant
      .addLayout(req.body.name, req.file)
      .then(() => {
        console.log("work");
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
