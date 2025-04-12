const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true }, // per unit
  unit: { type: String, default: 'unit' }, // e.g., kg, bag
  type: { type: String, default: 'General' }, // e.g., Cement, Steel
  category: { type: String, default: 'Construction' } // e.g., Structural
});

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;
