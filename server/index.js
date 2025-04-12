const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const materialRoutes = require('./routes/materialRoutes');
const estimateRoutes = require('./routes/estimate');



dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', materialRoutes);  // Route prefix: /api/materials
app.use('/api', estimateRoutes);


require('./db'); // Connect to DB



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => {
      console.log('Server running');
    });
  })
  .catch((err) => console.error(err));

  
  