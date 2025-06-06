const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";

    if (file.fieldname === "slider") {
      uploadPath = path.join(__dirname, "../public/slider");
    } else {
      return cb(new Error("Invalid fieldname"));
    }

    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Multer Configuration
const upload = multer({
  storage: fileStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Please upload an image (PNG or JPG)"));
    }
    cb(null, true);
  },
});
module.exports = { upload };
