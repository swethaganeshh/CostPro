const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',      // 🔗 Reference to the User model
    required: true
  },
  name: String,
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  materials: [{
    name: String,
    quantity: Number,
    rate: Number,
  }],
  laborHours: Number,
  overheadRate: Number,
  totalCost: Number,
  optimized: {
    suggestions: [String],
    optimizedCost: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
