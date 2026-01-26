import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: "", type: "", age: "", image: "" });

  const API_URL = "https://pet-adoption-backend-6ntk.onrender.com/api/pets";

  const fetchPets = async () => {
    try {
      const res = await axios.get(API_URL);
      setPets(res.data);
    } catch (err) {
      console.error("Error fetching pets:", err);
    }
  };

  const addPet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, newPet);
      setPets([...pets, res.data]);
      setNewPet({ name: "", type: "", age: "", image: "" });
    } catch (err) {
      console.error("Error adding pet:", err);
    }
  };

  const deletePet = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPets(pets.filter((pet) => pet._id !== id));
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  const updatePet = async (id, updatedFields) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedFields);
      setPets(pets.map((pet) => (pet._id === id ? res.data : pet)));
    } catch (err) {
      console.error("Error updating pet:", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>🐾 Pet Adoption Center</h1>
      </header>

      <form className="pet-form" onSubmit={addPet}>
        <input
          type="text"
          placeholder="Name"
          value={newPet.name}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={newPet.type}
          onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={newPet.age}
          onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPet.image}
          onChange={(e) => setNewPet({ ...newPet, image: e.target.value })}
        />
        <button type="submit">Add Pet</button>
      </form>

      <div className="pet-list">
        {pets.map((pet) => (
          <div key={pet._id} className="pet-card">
            {pet.image && <img src={pet.image} alt={pet.name} />}
            <h2>{pet.name}</h2>
            <p>{pet.type}, {pet.age} years old</p>
            <p>Status: {pet.adopted ? "Adopted 🏠" : "Available 🐶"}</p>
            <div className="buttons">
              <button
                className="update-btn"
                onClick={() => updatePet(pet._id, { adopted: !pet.adopted })}
              >
                {pet.adopted ? "Mark as Available" : "Mark as Adopted"}
              </button>
              <button className="delete-btn" onClick={() => deletePet(pet._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
