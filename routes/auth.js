const express = require("express");
const User = require("../models/user");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { username, phone } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ phone }, { username }] });
    if (existingUser) {
      const message =
        existingUser.phone === phone
          ? "Phone Number Is Used!"
          : "Username Is Used!";
      return res.status(400).json({ message });
    }

    const user = new User({
      username,
      phone,
      role: "user",
      image: null,
    });
    const newUser = await user.save();

    const token = jwt.sign(
      { name: newUser.phone },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      }
    );
    const refreshtoken = jwt.sign(
      { name: newUser.phone },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "Registration Successful!",
      token,
      refreshtoken,
      user: newUser,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", (req, res) => {
  const phone = req.body.phone;

  User.findOne({ phone: phone })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Phone Number Not Found!" });
      }

      const token = jwt.sign(
        { name: user.phone },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "60s",
        }
      );

      const refreshToken = jwt.sign(
        { name: user.phone },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        message: "Login Successful!",
        token: token,
        refreshToken: refreshToken,
        user: user,
      });
    })
    .catch((err) => {
      // console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/refresh-token", (req, res, next) => {
  const refreshToken = req.headers.authorization.split(" ")[1];
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        res.status(400).json({
          message: "Invalid refresh token!",
        });
      } else {
        const token = jwt.sign(
          { name: decoded.name },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "60s",
          }
        );
        const newRefreshToken = jwt.sign(
          { name: decoded.name },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).json({
          message: "Token refreshed successfully!",
          token,
          refreshToken: newRefreshToken,
        });
      }
    }
  );
});

module.exports = router;
