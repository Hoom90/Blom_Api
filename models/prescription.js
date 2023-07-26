const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    userId: String,                 // کاربر
    flowerId: String,               // گل
    rootCause: String,              //علت
    damagePercentage: Int16Array,   //درصد خرابی
    cureMethod: String,             //روش درمان
    medecine: String,               //دارو
    necessaryTraining: String,      //اموزش های لازم
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
