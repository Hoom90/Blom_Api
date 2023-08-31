const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_URL, {
    authSource: "admin",
  })
  .then(console.log("connected to MongoDB"))
  .catch((err) => {
    console.log("failed to connect MongoDB: " + err.message);
  });

const db = mongoose.connection;

app.use(express.json());
app.use(cors());

const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
const flowersRouter = require("./routes/flowers");
const libraryRouter = require("./routes/library");
const prescriptionsRouter = require("./routes/prescriptions");
const authRouter = require("./routes/auth");

app.use(express.static("public"));
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/flowers", flowersRouter);
app.use("/api/library", libraryRouter);
app.use("/api/prescriptions", prescriptionsRouter);
app.use("/api", authRouter);

app.listen(3000, () => console.log("Server Started"));
