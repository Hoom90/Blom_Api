const mongoose = require("mongoose");
const schema = mongoose.Schema;

const librarySchema = new schema(
  {
    name: String,
    image: String,
  },
  { timestamps: true }
);

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
