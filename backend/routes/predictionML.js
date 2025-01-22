const express = require('express');
const axios = require('axios');
const router = express.Router();

// Predicción basada en Machine Learning
router.post('/', async (req, res) => {
  try {
    const { teamA, teamB, stats } = req.body;

    // Lógica de llamada al modelo de Machine Learning
    const response = await axios.post('http://ml-service/predict', { teamA, teamB, stats });

    res.json({ prediction: response.data.prediction });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching prediction from ML model' });
  }
});

module.exports = router;
