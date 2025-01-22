const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const Prediction = require('../models/Prediction');
const router = express.Router();

// Obtener predicciones de un usuario
router.get('/', authMiddleware, async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user.id });
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching predictions' });
  }
});

// Crear una nueva predicción
router.post(
  '/',
  [
    authMiddleware,
    body('sport').notEmpty().withMessage('Sport is required'),
    body('prediction').notEmpty().withMessage('Prediction is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { sport, prediction } = req.body;
      const newPrediction = new Prediction({
        user: req.user.id,
        sport,
        prediction,
      });
      await newPrediction.save();
      res.status(201).json(newPrediction);
    } catch (err) {
      res.status(500).json({ error: 'Error saving prediction' });
    }
  }
);

module.exports = router;
