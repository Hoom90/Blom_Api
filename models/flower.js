const mongoose = require("mongoose");
const schema = mongoose.Schema;

const flowerSchema = new schema(
  {
    userId: String, // کاربر
    name: String, // نام کاربر برای گل
    light: String, // نوع نور
    temprature: String, // دما
    soil: String,
    symptom: String,
    description: String,
    fileName: String,
    status: String, //وضعیت بررسی
  },
  { timestamps: true }
);

const Flower = mongoose.model("Flower", flowerSchema);

module.exports = Flower;
