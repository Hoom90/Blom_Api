const express = require("express");
const router = express.Router();
const User = require("../models/user");

const authenticate = require("../middleware/authenticate");

// const urlAddressForFile = "http://localhost:3000";
const urlAddressForFile = "https://blom-server.iran.liara.run";

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.originalname.split(".")[1] == "mp4") {
      cb(null, "./public/user/videos");
    } else {
      cb(null, "./public/user/images");
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
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Creating one
router.post("/", authenticate, async (req, res) => {
  const user = new User({
    username: req.body.username,
    phone: req.body.phone,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", authenticate, getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", authenticate, getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
