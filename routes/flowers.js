const express = require("express");
const router = express.Router();
const Flower = require("../models/flower");

const authenticate = require("../middleware/authenticate");

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

// Getting all
router.get("/", async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getFlower, (req, res) => {
  res.json(res.flower);
});

// Creating one
router.post("/", authenticate, upload.single("file"), async (req, res) => {
  const flower = new Flower({
    userId: req.body.userId,
    name: req.body.name,
    wateringTime: req.body.water,
    light: req.body.light,
    soilingTime: req.body.soil,
    temprature: req.body.temprature,
    fileName: req.body.fileName,
    status: "checking",
  });
  if (flower.fileName != null) {
    let fileType = flower.fileName.split(".").pop();
    // blog.fileName = Date.now() + "." + fileType;
    if (fileType != "") {
      if (fileType === "mp4") {
        flower.is_video = true;
        flower.fileName =
          urlAddressForFile + "/flower/videos/" + flower.fileName;
      } else {
        flower.is_video = false;
        flower.fileName =
          urlAddressForFile + "/flower/images/" + flower.fileName;
      }
    }
  }
  try {
    const newFlower = await flower.save();
    res.status(201).json(newFlower);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
// router.patch("/:id", authenticate, getFlower, async (req, res) => {
//   if (req.body.username != null) {
//     res.user.username = req.body.username;
//   }
//   try {
//     const updatedUser = await res.user.save();
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Deleting One
router.delete("/:id", authenticate, getFlower, async (req, res) => {
  try {
    await res.flower.deleteOne();
    res.json({ message: "Deleted FLower" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getFlower(req, res, next) {
  let flower;
  try {
    flower = await Flower.findById(req.params.id);
    if (flower == null) {
      return res.status(404).json({ message: "Cannot find Flower" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.flower = flower;
  next();
}

module.exports = router;
