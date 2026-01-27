import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import PetList from "./components/PetList";
import "./App.css";

const API_URL = "https://pet-adoption-backend-6ntk.onrender.com";

export default function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => { fetchPets(); }, []);

  const fetchPets = async () => {
    const res = await fetch(`${API_URL}/pets`);
    const data = await res.json();
    setPets(data);
  };

  const addPet = (pet) => setPets([pet, ...pets]);

  const deletePet = async (id) => {
    await fetch(`${API_URL}/pets/${id}`, { method: "DELETE" });
    setPets(pets.filter((p) => p._id !== id));
  };

  return (
    <div>
      <header>
        <h1>Pet Adoption</h1>
      </header>
      <div className="pet-form">
        <InputForm addPet={addPet} />
      </div>
      <div className="pet-list">
        <PetList pets={pets} deletePet={deletePet} />
      </div>
    </div>
  );
}
