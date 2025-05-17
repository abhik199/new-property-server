const express = require("express");
const { Contact, Slider } = require("../models/index");
const { upload } = require("./img");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.post("/sliders", upload.single("slider"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newSlider = await Slider.create({
      imageUrl: req.file.filename,
      title,
      description,
      date: new Date(),
    });

    res.status(201).json({
      message: "Slider uploaded successfully",
      slider: newSlider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload slider" });
  }
});

router.get("/sliders", async (req, res) => {
  try {
    const sliders = await Slider.findAll({ order: [["date", "DESC"]] });
    res.json(sliders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sliders" });
  }
});
router.delete("/sliders/:id", async (req, res) => {
  try {
    const slider = await Slider.findByPk(req.params.id);
    if (!slider) {
      return res.status(404).json({ error: "Slider not found" });
    }

    const imagePath = path.join(__dirname, "../public/slider", slider.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await slider.destroy();
    res.json({ message: "Slider deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete slider" });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res
      .status(201)
      .json({ message: "Contact submitted successfully", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.destroy();

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
