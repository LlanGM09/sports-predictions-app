const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sport: { type: String, required: true },
  prediction: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prediction', PredictionSchema);
