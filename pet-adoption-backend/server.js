require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Pet = require("./models/Pet");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error(err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Create pet
app.post("/api/pets", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const savedPet = await pet.save();
    res.json(savedPet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all pets
app.get("/api/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
