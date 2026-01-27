import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import PetList from "./components/PetList";

const API_URL = "https://pet-adoption-backend-6ntk.onrender.com";

export default function App() {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    const res = await fetch(`${API_URL}/pets`);
    const data = await res.json();
    setPets(data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const addPet = (newPet) => setPets([...pets, newPet]);

  const deletePet = async (id) => {
    await fetch(`${API_URL}/pets/${id}`, { method: "DELETE" });
    setPets(pets.filter((p) => p._id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pet Adoption</h1>
      <InputForm addPet={addPet} />
      <PetList pets={pets} deletePet={deletePet} />
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    fontFamily: "Poppins, sans-serif",
    background: "#0b3d2e",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    textAlign: "center",
  },
};
