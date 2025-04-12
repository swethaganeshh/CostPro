// routes/materialRoutes.js
const express = require('express');
const router = express.Router();
const Material = require('../models/material');

router.get('/materials', async (req, res) => {
    try {
      const materials = await Material.find();
      res.json(materials);
    } catch (error) {
      console.error('❌ Error fetching materials:', error); // <-- log the error
      res.status(500).json({ error: 'Failed to fetch materials' });
    }
  });
  

  router.post('/materials', async (req, res) => {
    try {
      const material = new Material(req.body);
      await material.save();
      res.status(201).json(material);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add material' });
    }
  });
  

module.exports = router;
