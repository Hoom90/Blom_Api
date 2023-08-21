const express = require("express");
const router = express.Router();
const Prescription = require("../models/prescription");

// Getting all user items
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting all user items
router.get("/:user&:flower", getUserPrescription, (req, res) => {
  res.json(res.prescription);
});

async function getUserPrescription(req, res, next) {
  let prescription;
  try {
    prescription = await Prescription.find({
      userId: req.params.user,
      flowerId: req.params.flower,
    });
    if (prescription == "") {
      return res.status(404).json({ message: "No Prescription Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.prescription = prescription;
  next();
}

module.exports = router;
