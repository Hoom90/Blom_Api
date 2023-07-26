const mongoose = require("mongoose");
const schema = mongoose.Schema;

const flowerSchema = new schema(
  {
    userId: String, // کاربر
    name: String, // نام کاربر برای گل
    persianName: String, // نام گل
    latinName: String, // نام لاتین گل
    wateringTime: String, // زمان آبدهی
    lastWaterDate: Date, // آخرین زمان آبدهی
    fertilizingTime: String, // زمان کوددهی
    fertilzerType: String, // نوع کود
    lastFertilizingDate: Date, // آخرین زمان کوددهی
    light: String, // نوع نور
    soilingTime: String, // زمان تعویض خاک
    lastSoilingTime: Date, // اخرین زمان تعویض خاک
    soilType: String, // نوع خاک
    temprature: String, // دما
    category: String, // دسته بندی
    nowStatus: String, // وضعیت الان
    flowerStatus: String, // وضعیت های گل
    dustingTime: String, // زمان غبار پاشی
    lastDustingTime: Date, // آخرین زمان غبار پاشی
    icelandTime: String, // زمان جزیره
    lastIcelandDate: Date, // آخرین زمان جزیره
    pruningTime: String, // زمان هرس کردن
    lastPruningDate: Date, // اخرین زمان هرس کردن
    vaseChangeTime: String, // زمان تعویض گلدان
    lastVaseChangeTime: Date, // اخرین زما تعویض گلدان
    propagateTime: String, // زمان تکثیر کردن
    lastPropagateDate: Date, // اخرین زمان تکثیر کردن
    poisonTime: String, // زمان سم دهی
    lastPoisonDate: Date, // آخرین زمان سم دهی
    poisonType: String, // نوع سم
    fileName: String, // عکس گل
    status: String, //وضعیت بررسی
  },
  { timestamps: true }
);

const Flower = mongoose.model("Flower", flowerSchema);

module.exports = Flower;
