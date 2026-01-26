import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: "", type: "", age: "" });

  // ✅ Render backend URL
  const API_URL = "https://pet-adoption-backend-6ntk.onrender.com/api/pets";

  // Pets verilerini çek
  const fetchPets = async () => {
    try {
      const res = await axios.get(API_URL);
      setPets(res.data);
    } catch (err) {
      console.error("Error fetching pets:", err);
    }
  };

  // Yeni pet ekle
  const addPet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, newPet);
      setPets([...pets, res.data]);
      setNewPet({ name: "", type: "", age: "" });
    } catch (err) {
      console.error("Error adding pet:", err);
    }
  };

  // Pet sil
  const deletePet = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPets(pets.filter((pet) => pet._id !== id));
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  // Adopted durumunu güncelle
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
      <h1>Pet Adoption</h1>

      <form onSubmit={addPet}>
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
        <button type="submit">Add Pet</button>
      </form>

      <ul>
        {pets.map((pet) => (
          <li key={pet._id}>
            {pet.name} ({pet.type}, {pet.age} years)
            <button onClick={() => deletePet(pet._id)}>Delete</button>
            <button
              onClick={() =>
                updatePet(pet._id, { adopted: !pet.adopted })
              }
            >
              {pet.adopted ? "Mark as Available" : "Mark as Adopted"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
