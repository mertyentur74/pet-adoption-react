import React from "react";
import PetCard from "./PetCard";

function PetList({ pets, deletePet }) {
  return (
    <div>
      {pets.length === 0 ? (
        <p>No pets available. Add some!</p>
      ) : (
        pets.map((pet) => <PetCard key={pet._id} pet={pet} deletePet={deletePet} />)
      )}
    </div>
  );
}

export default PetList;
