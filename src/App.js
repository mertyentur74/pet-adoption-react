import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: "", type: "", age: "", image: "" });

  const API_URL = "https://pet-adoption-backend-6ntk.onrender.com/api/pets";

  // Fetch all pets
  const fetchPets = async () => {
    try {
      const response = await axios.get(API_URL);
      setPets(response.data);
    } catch (error) {
      console.error("Failed to fetch pets:", error.response || error.message);
    }
  };

  // Handle file input and convert to base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPet({ ...newPet, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new pet
  const addPet = async (event) => {
    event.preventDefault();
    try {
      if (!newPet.image) {
        alert("Please upload an image for the pet!");
        return;
      }
      const response = await axios.post(API_URL, newPet);
      setPets([...pets, response.data]);
      setNewPet({ name: "", type: "", age: "", image: "" });
      document.getElementById("imageInput").value = "";
    } catch (error) {
      console.error("Failed to add pet:", error.response || error.message);
    }
  };

  // Delete a pet
  const deletePet = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPets(pets.filter((pet) => pet._id !== id));
    } catch (error) {
      console.error("Failed to delete pet:", error.response || error.message);
    }
  };

  // Toggle adoption status
  const updatePet = async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedFields);
      setPets(pets.map((pet) => (pet._id === id ? response.data : pet)));
    } catch (error) {
      console.error("Failed to update pet:", error.response || error.message);
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
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleFileChange}
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
