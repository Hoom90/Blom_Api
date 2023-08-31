const express = require("express");
const router = express.Router();
const Prescription = require("../models/prescription");
const User = require("../models/user");

// const urlAddressForFile = "http://localhost:3000";
const urlAddressForFile = "https://blom-server.iran.liara.run";

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.originalname.split(".")[1] == "mp4") {
      cb(null, "./public/flower/videos");
    } else {
      cb(null, "./public/flower/images");
    }
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + "." + file.originalname.split(".").pop();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Getting all user items
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    const user = await User.find({}, { phone: 1, _id: 1 });
    res.json({ prescriptions, user });
    // res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting all user items
router.get("/:user&:flower", getUserPrescription, (req, res) => {
  res.json(res.prescription);
});

// Creating one
router.post("/", upload.array("files"), async (req, res) => {
  const prescription = new Prescription({
    userId: req.body.userId,
    flowerId: req.body.flowerId,
    flowerName: req.body.flowerName,
    plantImagesName: req.body.plantImagesName,
    health: req.body.health,
    symptoms: req.body.symptoms,
    solution: req.body.solution,
    education: req.body.education,
    medicine: req.body.medicine,
    medecineFileNames: req.body.fileName,
  });
  if (prescription.fileName != null) {
    let fileType = flower.fileName.split(".").pop();
    // blog.fileName = Date.now() + "." + fileType;
    if (fileType != "") {
      if (fileType === "mp4") {
        prescription.is_video = true;
        prescription.fileName =
          urlAddressForFile + "/medic/videos/" + prescription.fileName;
      } else {
        prescription.is_video = false;
        prescription.fileName =
          urlAddressForFile + "/medic/images/" + prescription.fileName;
      }
    }
  }
  try {
    const newPrescription = await prescription.save();
    res.status(201).json(newPrescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
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
