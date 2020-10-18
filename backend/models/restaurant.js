const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const restaurantSchema = new mongoose.Schema({
  img: {
    required: [true, "Missing image"],
    type: String,
  },
  layout: String,
  name: {
    required: [true, "Missing name"],
    type: String,
  },
  staff_ids: {
    required: [true, "Missing staff array"],
    type: [String],
  },
  tables: {
    required: [true, "Missing tableNums"],
    type: [Object],
  },
  category: {
    required: [true, "Missing category"],
    type: String,
  },
});

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

const createRestaurant = (
  name,
  img,
  currentStaff,
  tables,
  category
) => {
  return new Promise((resolve, reject) => {
    const restaurant = new Restaurant({
      name,
      img: Buffer.from(
        fs.readFileSync(`${path.resolve("./uploads")}/${img.filename}`)
      ).toString("base64"),
      staff_ids: currentStaff,
      tables,
      category,
    });

    restaurant.save(function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

const addLayout = (name, layout) => {
  return new Promise((resolve, reject) => {
    Restaurant.findOneAndUpdate(
      { name },
      {
        layout: Buffer.from(
          fs.readFileSync(`${path.resolve("./uploads")}/${layout.filename}`)
        ).toString("base64"),
      },
      function (err) {
        if (err) reject(err);
        resolve();
      }
    );
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
  addLayout,
};
