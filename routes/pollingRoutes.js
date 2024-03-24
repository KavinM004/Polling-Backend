const express = require("express");
const router = express.Router();
const Party = require("../models/partyModel");
const Polling = require("../models/pollingModel");

// Get all polling data
router.get("/", async (req, res) => {
  try {
    const pollingData = await Polling.find();
    res.json(pollingData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/pollingResult", async (req, res) => {
  try {
    const pollingResult = await Party.find().sort({ totalVotes: -1 });
    res.json(pollingResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create polling data
router.post("/", getParty, async (req, res) => {
  try {
    const newPolling = await Polling.create(req.body);
    await Party.updateOne(
      { partyName: req.body.partyName },
      { $inc: { totalVotes: 1 } }
    );
    res.status(201).json({
      status: "success",
      data: {
        party: newPolling,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getParty(req, res, next) {
  try {
    let party = await Party.find({ partyName: req.body.partyName });
    if (party.length == 0) {
      return res.status(404).json({ message: "Party not found" });
    }
    res.party = party;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
