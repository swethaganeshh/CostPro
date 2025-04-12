const express = require('express');
const router = express.Router();
const Estimation = require('../models/Estimation'); // import model
const Material = require('../models/material'); // for fetching rates

// POST /api/estimate
router.post('/estimate', async (req, res) => {
  try {
    const { materials, laborHours, laborRate, extraCost } = req.body;

    let breakdown = [];
    let materialCost = 0;

    for (let item of materials) {
      const dbMaterial = await Material.findOne({ name: item.name });
      const rate = dbMaterial ? dbMaterial.rate : 0;
      const cost = rate * item.quantity;
      materialCost += cost;

      breakdown.push({
        name: item.name,
        rate,
        quantity: item.quantity,
        cost
      });
    }

    const laborCost = laborHours * laborRate;
    const totalCost = materialCost + laborCost + (extraCost || 0);

    // 🔹 Save estimation to database
    const newEstimation = new Estimation({
      breakdown,
      laborCost,
      extraCost,
      totalCost
    });

    await newEstimation.save();

    res.json({ breakdown, laborCost, extraCost, totalCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Estimation failed' });
  }
});

router.get('/estimations', async (req, res) => {
    try {
      const estimations = await Estimation.find().sort({ createdAt: -1 });
      res.json(estimations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch estimations' });
    }
  });
  

module.exports = router;
