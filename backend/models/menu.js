const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing prop"],
  },
  price: {
    type: Number,
    required: [true, "Missing prop"],
  },
  desc: {
    type: String,
    required: [true, "Missing prop"],
  },
  img: {
    type: Buffer,
    required: [true, "Missing image"],
  },
});

const menuSchema = new mongoose.Schema({
  _id: {
    // the category (e.g. the lunch menu)
    type: String,
    required: [true, "Missing category"],
  },
  items: {
    type: [menuItemSchema],
    required: [true, "Missing items"],
  },
});

const Menu = mongoose.model("Menu", menuSchema);
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

const updateMenu = (name, price, desc, category, img) => {
  return new Promise((resolve, reject) => {
    const theMenuItem = new MenuItem({
      name,
      price,
      desc,
      img: fs.readFileSync(
        `${path.resolve("./uploads")}/${img.filename}`
      ),
    });
    console.log("menu item", theMenuItem);

    Menu.findById(category, function (err, menuForCategory) {
      if (err) reject(err);

      if (menuForCategory == null) {
        const newCategoryMenu = new Menu({
          _id: category,
          items: [theMenuItem],
        });
        console.log("menu", newCategoryMenu);

        newCategoryMenu.save(function (err) {
          if (err) reject(err);
          resolve();
        });
      } else {
        const items = menuForCategory.items.push(theMenuItem);
        Menu.findByIdAndUpdate(category, { items: items }, (err) =>
          console.log(err)
        );
      }
    });
  });
};

module.exports = {
  updateMenu,
};
