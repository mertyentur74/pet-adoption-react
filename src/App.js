import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://pet-adoption-backend-6ntk.onrender.com";

function App() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch pets on load
  useEffect(() => {
    fetch(`${API_URL}/pets`)
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !type || !age || !image) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("age", age);
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/pets`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add pet");
      }

      const newPet = await response.json();

      // Update UI without refresh
      setPets((prev) => [...prev, newPet]);

      // Reset form
      setName("");
      setType("");
      setAge("");
      setImage(null);
      document.getElementById("imageInput").value = "";

    } catch (error) {
      console.error(error);
      alert("Error adding pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Pet Adoption</h1>

      {/* Add Pet Form */}
      <form className="pet-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pet name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Pet type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Pet"}
        </button>
      </form>

      {/* Pet List */}
      <div className="pet-grid">
        {pets.map((pet) => (
          <div className="pet-card" key={pet._id}>
            <img src={pet.imageUrl} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p>{pet.type}</p>
            <p>{pet.age} years old</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
