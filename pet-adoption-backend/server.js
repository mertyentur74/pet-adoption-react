import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Allow large JSON payloads (for big images)
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Pet model
import Pet from "./models/Pet.js";

// GET all pets
app.get("/api/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new pet
app.post("/api/pets", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const savedPet = await pet.save();
    res.json(savedPet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update pet
app.put("/api/pets/:id", async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE pet
app.delete("/api/pets/:id", async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
