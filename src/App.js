import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    age: "",
    image: ""
  });

  const API_URL = "https://pet-adoption-backend-6ntk.onrender.com/api/pets";

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const res = await axios.get(API_URL);
    setPets(res.data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setNewPet(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addPet = async () => {
    console.log("ADD BUTTON CLICKED");
    console.log("Sending pet:", newPet);

    if (!newPet.name || !newPet.type || !newPet.age || !newPet.image) {
      alert("All fields including image are required.");
      return;
    }

    try {
      const res = await axios.post(API_URL, newPet);
      console.log("Pet saved:", res.data);

      setPets([...pets, res.data]);
      setNewPet({ name: "", type: "", age: "", image: "" });
      document.getElementById("imageInput").value = "";
    } catch (err) {
      console.error("Add pet failed:", err.response || err);
      alert("Failed to add pet. Check console.");
    }
  };

  return (
    <div className="App">
      <h1>Pet Adoption Center</h1>

      <div className="pet-form">
        <input
          placeholder="Name"
          value={newPet.name}
          onChange={e => setNewPet({ ...newPet, name: e.target.value })}
        />

        <input
          placeholder="Type"
          value={newPet.type}
          onChange={e => setNewPet({ ...newPet, type: e.target.value })}
        />

        <input
          type="number"
          placeholder="Age"
          value={newPet.age}
          onChange={e => setNewPet({ ...newPet, age: e.target.value })}
        />

        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* 🔥 DIRECT CLICK — NO FORM */}
        <button onClick={addPet}>Add Pet</button>
      </div>

      <div className="pet-list">
        {pets.map(pet => (
          <div key={pet._id} className="pet-card">
            <img src={pet.image} alt={pet.name} />
            <h2>{pet.name}</h2>
            <p>{pet.type} • {pet.age} years</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
