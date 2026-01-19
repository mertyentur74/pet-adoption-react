import React, { useState } from 'react';
import InputForm from './components/InputForm';
import PetList from './components/PetList';

function App() {
  const [pets, setPets] = useState([]);

  const addPet = (newPet) => {
    setPets([...pets, newPet]);
  };

  const removePet = (indexToRemove) => {
    const updatedPets = pets.filter((_, index) => index !== indexToRemove);
    setPets(updatedPets);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Pet Adoption System</h1>
      <InputForm addPet={addPet} />
      <PetList pets={pets} removePet={removePet} />
    </div>
  );
}

export default App;
