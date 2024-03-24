const mongoose = require('mongoose');

const pollingSchema = new mongoose.Schema({
  partyName: { type: String, required: true },
  EVId: { type: String, required: true },
  votingId: { 
    type: String,
    required: [true, "VotingId is required"],
    unique: true // This ensures uniqueness
  },  
  polledOn: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Polling', pollingSchema);
