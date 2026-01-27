import React from "react";
import PetCard from "./PetCard";

function PetList({ pets, deletePet }) {
  return (
    <div style={styles.list}>
      {pets.length === 0 ? <p>No pets available.</p> :
        pets.map((p) => <PetCard key={p._id} pet={p} deletePet={deletePet} />)
      }
    </div>
  );
}

const styles = {
  list: { display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", padding: 20 }
};

export default PetList;