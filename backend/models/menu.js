const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing prop"],
  },
  price: {
    type: String,
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

const updateMenu = (body) => {
  return new Promise((resolve, reject) => {
    const theMenuItem = new MenuItem(body);

    Menu.findById(category, function (err, menuForCategory) {
      if (err) reject(err);

      if (menuForCategory == null) {
        const newCategoryMenu = new Menu({
          category,
          items: [theMenuItem],
        });

        newCategoryMenu.save(function (err) {
          if (err) reject(err);
          resolve();
        });
      } else {
        const items = menuForCategory.items.push(theMenuItem);
        Menu.findByIdAndUpdate(category, { items: items }, (err) => console.log(err));
      }
    });
  });
};

module.exports = {
  updateMenu,
};
