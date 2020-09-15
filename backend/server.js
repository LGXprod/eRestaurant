require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const restaurantApp = express();
restaurantApp.use(bodyParser.urlencoded({ extended: true }));

const loginController = require("./controllers/loginController");
const bookingController = require("./controllers/bookingController");

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
    bookingController(restaurantApp);
})();
