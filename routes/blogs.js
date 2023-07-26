const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

const authenticate = require("../middleware/authenticate");

const urlAddressForFile = "http://localhost:3000";
// const urlAddressForFile = "https://blom-server.iran.liara.run";

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.originalname.split(".")[1] == "mp4") {
      cb(null, "./public/blog/videos");
    } else {
      cb(null, "./public/blog/images");
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
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getBlog, (req, res) => {
  res.json(res.blog);
});

// Creating one
// router.post("/", authenticate, upload.single("file"), async (req, res) => {
// router.post("/", upload.single("file"), async (req, res) => {
router.post("/", async (req, res) => {
  res.send(req.file);
  // const blog = new Blog({
  //   author: req.body.author,
  //   title: req.body.title,
  //   text: req.body.text,
  //   fileName: req.body.filename,
  //   is_video: false,
  //   likes: 0,
  //   views: 0,
  // });
  // let fileType = blog.fileName.split(".").pop();
  // // blog.fileName = Date.now() + "." + fileType;
  // if (fileType != "") {
  //   if (fileType === "mp4") {
  //     blog.is_video = true;
  //     blog.fileName = urlAddressForFile + "/blog/videos/" + blog.fileName;
  //   } else {
  //     blog.is_video = false;
  //     blog.fileName = urlAddressForFile + "/blog/images/" + blog.fileName;
  //   }
  // }

  // try {
  //   const newBlog = await blog.save();
  //   res.status(201).json(newBlog);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
});

// Updating One
router.patch("/:id", authenticate, getBlog, async (req, res) => {
  if (req.body.title != null) {
    res.blog.title = req.body.title;
  }
  if (req.body.text != null) {
    res.blog.text = req.body.text;
  }
  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", authenticate, getBlog, async (req, res) => {
  try {
    await res.blog.deleteOne();
    res.json({ message: "Deleted Blog" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBlog(req, res, next) {
  let blog;
  try {
    blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: "Cannot find Blog" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.blog = blog;
  next();
}

module.exports = router;
