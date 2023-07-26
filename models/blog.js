const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    userId: String,       // کاربر
    title: String,        // سرتیتر
    text: String,         // متن
    fileName: String,     // نام فایل
    is_video: Boolean,    // عکس / ویدیو
    likes: Number,        // تعداد لایک
    views: Number,        // تعداد بازدید
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
