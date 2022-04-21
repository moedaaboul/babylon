const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  itemTitle: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemStock: {
    type: Number,
    required: true,
  },
  itemSize: [
    {
      type: String,
      trim: true,
    },
  ],
});

const Item = model("Item", itemSchema);

module.exports = Item;
