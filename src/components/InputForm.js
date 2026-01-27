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
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input id="pet-name" name="name" className="input" placeholder="Pet Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input id="pet-type" name="type" className="input" placeholder="Pet Type" value={type} onChange={(e) => setType(e.target.value)} />
      <input id="pet-age" name="age" type="number" className="input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input id="pet-description" name="description" className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={handleImageChange} />
      <button className="add-btn" type="submit">Add Pet</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: "20px auto",
    maxWidth: 400,
    background: "#ffffff",
    color: "#000",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  },
};

export default InputForm;
