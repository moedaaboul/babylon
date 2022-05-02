const { Schema, model } = require('mongoose');

const lookSchema = new Schema({
  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

const Look = model('Look', lookSchema);

module.exports = Look;
