import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://pet-adoption-backend-6ntk.onrender.com";

function InputForm({ addPet }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !type || !age) {
      setError("Name, type, and age are required!");
      return;
    }

    const newPet = { name, type, age, description, image };

    try {
      const res = await axios.post(`${API_URL}/pets`, newPet);
      addPet(res.data);
      setName(""); setType(""); setAge(""); setDescription(""); setImage(null);
    } catch (err) {
      console.error(err);
      setError("Error adding pet!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input className="input" type="text" placeholder="Pet Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="input" type="text" placeholder="Pet Type" value={type} onChange={(e) => setType(e.target.value)} />
      <input className="input" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input className="input" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="input" type="file" onChange={handleImageChange} />
      <button className="add-btn" type="submit">Add Pet</button>
    </form>
  );
}

export default InputForm;
