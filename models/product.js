const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    require: [true, "price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    // enum: ["ikea", "liddy", "caressa", "marcos"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
