import React from "react";

function PetCard({ pet, deletePet }) {
  return (
    <div className="pet-card">
      <h3>{pet.name}</h3>
      <p>Type: {pet.type}</p>
      <p>Age: {pet.age}</p>
      <p>{pet.description}</p>
      {pet.image && <img src={pet.image} alt={pet.name} />}
      <button className="delete-btn" onClick={() => deletePet(pet._id)}>X</button>
    </div>
  );
}

export default PetCard;
