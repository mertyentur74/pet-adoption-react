const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Pet = require("./models/Pet");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Test route
app.get("/", (req, res) => res.send("Pet Adoption API is running"));

// GET all pets
app.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pets" });
  }
});

// POST new pet
app.post("/pets", async (req, res) => {
  try {
    const { name, type, age, description, image } = req.body;
    if (!name || !type || !age)
      return res.status(400).json({ error: "Name, type, and age are required" });

    const pet = new Pet({ name, type, age, description, image });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to add pet" });
  }
});

// DELETE pet
app.delete("/pets/:id", async (req, res) => {
  try {
    const deleted = await Pet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Pet not found" });
    res.json({ message: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete pet" });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error(err));
