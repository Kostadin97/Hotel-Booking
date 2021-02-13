const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  hotel: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  freerooms: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  bookers: {
      type: Array,
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);