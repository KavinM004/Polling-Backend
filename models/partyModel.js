const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  partyName: { type: String, required: true, max: 100, unique: true},
  partyID: { type: String, required: true, max: 50, unique: true},
  partyImage: {type: String, required: true},
  createdOn: { type: Date, default: Date.now },
  totalVotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Party', partySchema);
