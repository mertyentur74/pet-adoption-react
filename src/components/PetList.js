import React from "react";
import PetCard from "./PetCard";

export default function PetList({ pets, deletePet }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:20, justifyContent:"center" }}>
      {pets.length === 0 ? <p>No pets available.</p> : pets.map(p => <PetCard key={p._id} pet={p} deletePet={deletePet} />)}
    </div>
  );
}