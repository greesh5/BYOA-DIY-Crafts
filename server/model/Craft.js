const mongoose = require('mongoose');

const craftSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  materials: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  steps: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    required:true
  },
  video: {
    type: String,
    required: true
  }
});

const Craft = mongoose.model('Craft', craftSchema);

module.exports = Craft;
