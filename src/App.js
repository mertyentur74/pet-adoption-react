import React, { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";
import PetList from "./components/PetList";

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/pets");
      setPets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addPet = (newPet) => {
    setPets([...pets, newPet]);
  };

  const deletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pets/${id}`);
      setPets(pets.filter((pet) => pet._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1>Pet Adoption System</h1>
      <InputForm addPet={addPet} />
      <PetList pets={pets} deletePet={deletePet} />
    </div>
  );
}

export default App;
