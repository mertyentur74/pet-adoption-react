import React from "react";

function PetCard({ pet, deletePet }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        position: "relative",
      }}
    >
      <h3>{pet.name}</h3>
      <p>Type: {pet.type}</p>
      <p>Age: {pet.age}</p>
      <p>{pet.description}</p>
      {pet.image && <img src={pet.image} alt={pet.name} style={{ width: "150px", height: "auto" }} />}
      <button
        onClick={() => deletePet(pet._id)}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          cursor: "pointer",
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "5px 8px",
        }}
      >
        X
      </button>
    </div>
  );
}

export default PetCard;
