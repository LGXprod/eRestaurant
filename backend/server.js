require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const restaurantApp = express();
restaurantApp.use(bodyParser.urlencoded({ extended: true }));

const loginController = require("./controllers/loginController");
const registrationController = require("./controllers/registrationController");
const bookingController = require("./controllers/bookingController");
const menuController = require("./controllers/menuController");

restaurantApp.listen(5000, function () {
  console.log("Server running on port 5000");
  console.log("Change");
});

const mongoURI = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.bf9ms.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

(async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  loginController(restaurantApp);
  registrationController(restaurantApp);
  bookingController(restaurantApp);
  menuController(restaurantApp, upload);
})();
