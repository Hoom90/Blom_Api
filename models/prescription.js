const mongoose = require("mongoose");
const schema = mongoose.Schema;

const prescriptionSchema = new schema(
  {
    userId: String, // کاربر
    flowerId: String, // گل
    flowerName: String, // نام گل
    plantImagesName: String,
    health: String, //درصد خرابی
    flowerFileName: String, //عکس گل
    symptoms: String, //علائم
    solution: String, //روش درمان
    education: String, //اموزش های لازم
    medecine: String, //دارو
    medecineFileNames: String, // عکس دارو ها
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
