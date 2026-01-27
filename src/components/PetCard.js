import React from "react";

function PetCard({ pet, deletePet }) {
  return (
    <div style={styles.card}>
      <h3>{pet.name}</h3>
      <p>{pet.type} • {pet.age} years</p>
      <p>{pet.description}</p>
      {pet.image && <img src={pet.image} alt={pet.name} style={styles.img} />}
      <button style={styles.deleteBtn} onClick={() => deletePet(pet._id)}>X</button>
    </div>
  );
}

const styles = {
  card: {
    width: 220,
    background: "#ffffff",
    color: "#000",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
    position: "relative",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    transition: "transform 0.2s",
  },
  img: { width: "100%", height: 150, objectFit: "cover", borderRadius: 8, marginBottom: 5 },
  deleteBtn: { position: "absolute", top: 5, right: 5, backgroundColor: "red", color: "#fff", border: "none", borderRadius: 8, padding: "5px 8px", cursor: "pointer" }
};

export default PetCard;