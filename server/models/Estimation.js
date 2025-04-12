const mongoose = require('mongoose');

const estimationSchema = new mongoose.Schema({
  materials: [
    {
      name: String,
      quantity: Number,
      rate: Number,
      cost: Number
    }
  ],
  laborHours: Number,
  laborRate: Number,
  laborCost: Number,
  extraCost: Number,
  totalCost: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Estimation = mongoose.model('Estimation', estimationSchema);
module.exports = Estimation;
