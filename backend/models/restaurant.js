const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const restaurantSchema = new mongoose.Schema({
  img: {
    required: [true, "Missing image"],
    type: String,
  },
  name: {
    required: [true, "Missing name"],
    type: String,
  },
  staff_ids: {
    required: [true, "Missing staff array"],
    type: [String],
  },
});

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

const createRestaurant = (name, img, currentStaff) => {
  return new Promise((resolve, reject) => {
    const restaurant = new Restaurant({
      name,
      img: Buffer.from(
        fs.readFileSync(`${path.resolve("./uploads")}/${img.filename}`)
      ).toString("base64"),
      staff_ids: currentStaff,
    });

    restaurant.save(function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

const getRestaurantByName = (name) => {
  return new Promise((resolve, reject) => {
    Restaurant.find(name == null ? {} : { name }, function (err, restaurants) {
      if (err) reject(err);

      resolve(restaurants);
    });
  });
};

module.exports = {
  createRestaurant,
  getRestaurantByName,
};
