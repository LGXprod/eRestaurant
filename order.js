const mongoose = require("mongoose");
const table = require("./backend/models/table");

const orderSchema = new mongoose.Schema({
    item_id: String,
    quantity: Number, 
    booking_id: String,
});

const Order = mongoose.model("Order", orderSchema);

function createNewOrder(item_id, quantity, booking_id) {
    return new Promise((resolve, reject) => {

        

        const Order = new Order({
            item_id: item_id,
            quantity: Number,
            
        });

        Order.save(function (err) {
            if (err)
                reject(err);

            resolve(booking_id);
        });

        (booking_id.getBooking_id(booking_id));
    });
}

module.exports = {
  createNewOrder: createNewOrder
};