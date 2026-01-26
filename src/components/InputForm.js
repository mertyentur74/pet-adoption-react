import React, { useState } from "react";
import axios from "axios";

function InputForm({ addPet }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Convert file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPet = { name, type, age, description, image };
    try {
      const res = await axios.post("http://localhost:5000/pets", newPet);
      addPet(res.data);
      setName("");
      setType("");
      setAge("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <input type="text" placeholder="Pet Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Pet Type" value={type} onChange={(e) => setType(e.target.value)} required />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={handleImageChange} />
      <button type="submit" style={{ padding: "10px", fontSize: "16px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none" }}>
        Add Pet
      </button>
    </form>
  );
}

export default InputForm;
