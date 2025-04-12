const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth'); // ⬅️ import the auth middleware


// Calculate cost
const calculateCost = (materials, laborHours, laborRate, overheadRate) => {
  const materialCost = materials.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  const laborCost = laborHours * laborRate;
  const overhead = (materialCost + laborCost) * overheadRate;
  const total = materialCost + laborCost + overhead;
  return { materialCost, laborCost, overhead, total };
};

// ✅ POST: Create project (Protected)
router.post('/', auth, async (req, res) => {
  const { name, dimensions, materials, laborHours } = req.body;
  const laborRate = 200;
  const overheadRate = 0.15;
  const { total } = calculateCost(materials, laborHours, laborRate, overheadRate);

  const newProject = new Project({
    name,
    dimensions,
    materials,
    laborHours,
    overheadRate,
    totalCost: total,
    user: req.user.id // 🔐 linking project to logged-in user
  });

  await newProject.save();
  res.status(201).json(newProject);
});


// ✅ GET: Get all projects of logged-in user (Protected)
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(projects);
});


module.exports = router;
