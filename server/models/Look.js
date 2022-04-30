const { Schema, model } = require('mongoose');

const lookSchema = new Schema({
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Look = model('Look', lookSchema);

module.exports = Look;
