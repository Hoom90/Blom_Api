const express = require("express");
const router = express.Router();
const Library = require("../models/library");

// const urlAddressForFile = "http://localhost:3000";
const urlAddressForFile = "https://blom-server.iran.liara.run";

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/library/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Getting all
router.get("/", async (req, res) => {
  try {
    const items = await Library.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getItem, (req, res) => {
  res.json(res.item);
});

// Creating one
router.post("/", upload.single("file"), async (req, res) => {
  const item = new Library({
    name: req.body.name,
    image: req.body.image,
  });
  if (item.image != null) {
    item.image =
    urlAddressForFile + "/library/images/" + item.image;
  }
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
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
router.delete("/:id", getItem, async (req, res) => {
  try {
    await res.Item.deleteOne();
    res.json({ message: "Deleted Item" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getItem(req, res, next) {
  let Item;
  try {
    Item = await Library.findById(req.params.id);
    if (Item == null) {
      return res.status(404).json({ message: "No Item Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.Item = Item;
  next();
}

module.exports = router;
