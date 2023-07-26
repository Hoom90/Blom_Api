const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: String,         // نام کاربری
    phone: String,            // شماره تماس
    name: String,             // نام و نام خانوادگی
    city: String,             // شهر
    creditCard: String,       // شماره کارت
    signUp: Date,             // تاریخ ثبت نام
    gender: String,           // جنسیت
    role: String,             // نقش
    email: String,            // ایمیل
    password: String,         // رمز عبور
    image: String,            // نام عکس کاربر
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
