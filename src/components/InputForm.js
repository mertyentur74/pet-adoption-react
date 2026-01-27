import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://pet-adoption-backend-6ntk.onrender.com";

export default function InputForm({ addPet }) {
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

    try {
      const res = await axios.post(`${API_URL}/pets`, { name, type, age, description, image });
      addPet(res.data);
      setName(""); setType(""); setAge(""); setDescription(""); setImage(null);
    } catch {
      setError("Error adding pet!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:10, maxWidth:400, margin:"20px auto", padding:20, background:"#fff", borderRadius:8 }}>
      {error && <p style={{color:"red"}}>{error}</p>}
      <input id="name" name="name" placeholder="Pet Name" value={name} onChange={(e)=>setName(e.target.value)} />
      <input id="type" name="type" placeholder="Pet Type" value={type} onChange={(e)=>setType(e.target.value)} />
      <input id="age" name="age" type="number" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)} />
      <input id="description" name="description" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
      <input type="file" onChange={handleImageChange} />
      <button style={{ background:"#0B3D02", color:"#fff", borderRadius:8, padding:"0.7rem 1.5rem", border:"none", cursor:"pointer"}}>Add Pet</button>
    </form>
  );
}
