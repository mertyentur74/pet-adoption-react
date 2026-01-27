import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import PetList from "./components/PetList";

const API_URL = "https://pet-adoption-backend-6ntk.onrender.com";

export default function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => { fetchPets(); }, []);

  const fetchPets = async () => {
    const res = await fetch(`${API_URL}/pets`);
    const data = await res.json();
    setPets(data);
  };

  const addPet = (newPet) => setPets([...pets, newPet]);
  const deletePet = async (id) => {
    await fetch(`${API_URL}/pets/${id}`, { method: "DELETE" });
    setPets(pets.filter((p) => p._id !== id));
  };

  return (
    <div style={{ padding: 30, fontFamily: "Poppins, sans-serif", background: "#0b3d2e", minHeight: "100vh", color: "white" }}>
      <h1 style={{ textAlign: "center" }}>Pet Adoption</h1>
      <InputForm addPet={addPet} />
      <PetList pets={pets} deletePet={deletePet} />
    </div>
  );
}
