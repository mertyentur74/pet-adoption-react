import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://pet-adoption-backend-6ntk.onrender.com";

export default function InputForm({ addPet }) {
  const [form, setForm] = useState({ name: "", type: "", age: "", description: "", image: null });
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // limit file client-side (5MB) to reduce server issues
    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { name, type, age } = form;
    if (!name || !type || !age) return setError("Name, Type and Age are required");

    try {
      const res = await axios.post(`${API_URL}/pets`, form, { headers: { "Content-Type": "application/json" } });
      addPet(res.data);
      setForm({ name: "", type: "", age: "", description: "", image: null });
      setPreview(null);
    } catch (err) {
      console.error("Add pet error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error adding pet");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.error}>{error}</div>}

      <input id="pet-name" name="name" placeholder="Pet Name" value={form.name} onChange={handleChange} style={styles.input} />
      <input id="pet-type" name="type" placeholder="Pet Type" value={form.type} onChange={handleChange} style={styles.input} />
      <input id="pet-age" name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} style={styles.input} />
      <input id="pet-desc" name="description" placeholder="Description" value={form.description} onChange={handleChange} style={styles.input} />

      <label style={styles.fileLabel}>
        <span>{preview ? "Image selected" : "Choose Image (optional)"}</span>
        <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      </label>

      {preview && <img src={preview} alt="preview" style={styles.preview} />}

      <button type="submit" style={styles.button}>Add Pet</button>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20
  },
  input: { padding: "10px", borderRadius: 8, border: "1px solid #ddd", width: "100%" },
  fileLabel: { padding: 12, borderRadius: 8, border: "1px dashed #0B3D02", textAlign: "center", cursor: "pointer", color: "#0B3D02" },
  button: { background: "#0B3D02", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer" },
  preview: { width: 200, height: "auto", borderRadius: 8, objectFit: "cover" },
  error: { color: "red", fontWeight: 600 }
};
