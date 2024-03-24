const express = require("express");
const router = express.Router();
const Party = require("../models/partyModel");

// Get all parties
router.get("/", async (req, res) => {
  try {
    const parties = await Party.find().limit(50).sort({ totalVotes: -1 });
    res.json(parties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific party
router.get("/:id", getParty, (req, res) => {
  res.json(res.party);
});

// Create a party
router.post("/", async (req, res) => {
  const party = new Party({
    partyName: req.body.partyName,
    partyID: req.body.partyID,
    partyImage: req.body.partyImage,
  });

  try {
    const newParty = await party.save();
    res.status(201).json({
      status: "success",
      data: {
        party: newParty,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a party
router.put("/:id", getParty, async (req, res) => {
  if (req.body.partyName != null) {
    res.party.partyName = req.body.partyName;
  }
  if (req.body.partyID != null) {
    res.party.partyID = req.body.partyID;
  }
  if (req.body.partyImage != null) {
    res.party.partyImage = req.body.partyImage;
  }
  try {
    const updatedParty = await res.party.save();
    res.json(updatedParty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a party
router.delete("/:id", getParty, async (req, res) => {
  try {
    let result = await Party.deleteOne({ _id: req.params.id }); 
    if (result.deletedCount == 0) {
      return res.status(404).json({ message: "Party not found" });
    }   
    res.json({ message: "Party deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getParty(req, res, next) {
  try {
    let party = await Party.findById(req.params.id);
    if (party == null) {
      return res.status(404).json({ message: "Party not found" });
    }
    res.party = party;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
