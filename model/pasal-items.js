const mongoose = require("mongoose");

const pasalItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    type: {
      type: String,
    },
    inStock: {
      type: Number,
    },
    stockCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PasalItems", pasalItemsSchema);
