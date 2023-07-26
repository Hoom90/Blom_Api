const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    userId: String,                             // کاربر
    name: String,                               // نام اشتراک
    type: { name: String, value: Int32Array },  // نوع اشتراک
    length: Int16Array,                         // مدت زمان اشتراک
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
