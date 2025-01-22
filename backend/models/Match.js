const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  scoreA: { type: Number },
  scoreB: { type: Number },
  league: { type: String, required: true },
  stats: { type: Object },
});

module.exports = mongoose.model('Match', MatchSchema);
