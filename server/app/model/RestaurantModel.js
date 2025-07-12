const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: {
    type: String,
  },
  restaurant_id: {
    type: String,
  },
  address: {
    building: {
      type: String,
    },
    coord: {
      type: [Number],
    },
    street: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  borough: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  grades: [String],
});

const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);

module.exports = RestaurantModel;
