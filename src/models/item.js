const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
    default: 'anonymous',
  },
  category: {
    type: String,
    enum: ['Electronics', 'Furniture', 'Clothing', 'Other'],
    required: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  contact: {
    type: String,
    required: true,
  }
});

const item = mongoose.model('item', itemSchema);

module.exports = item;