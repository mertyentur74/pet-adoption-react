import React from "react";

export default function PetCard({ pet, deletePet }) {
  return (
    <div style={{
      width: 240, background: "#fff", color: "#000", borderRadius: 8, padding: 12, position: "relative",
      boxShadow: "0 6px 12px rgba(0,0,0,0.12)"
    }}>
      {pet.image && <img src={pet.image} alt={pet.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }} />}
      <h3 style={{ margin: "8px 0 4px" }}>{pet.name}</h3>
      <p style={{ margin: 0 }}>{pet.type} • {pet.age} years</p>
      <p style={{ marginTop: 8 }}>{pet.description}</p>
      <button onClick={() => deletePet(pet._id)} style={{
        position: "absolute", top: 8, right: 8, background: "red", color: "#fff", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer"
      }}>X</button>
    </div>
  );
}
