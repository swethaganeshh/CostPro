// models/MaterialCost.js
const mongoose = require('mongoose');

const MaterialCostSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rate: { type: Number, required: true } // rate per unit
});

module.exports = mongoose.model('MaterialCost', MaterialCostSchema);
