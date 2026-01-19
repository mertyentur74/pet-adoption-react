import React from 'react';

function PetCard({ pet, index, removePet }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '6px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <button
        onClick={() => removePet(index)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '25px',
          height: '25px',
          cursor: 'pointer'
        }}
      >
        X
      </button>

      <h3 style={{ marginTop: 0 }}>{pet.name}</h3>
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <p>{pet.description}</p>
      {pet.photo && <img src={pet.photo} alt={pet.name} style={{ width: '150px', marginTop: '10px' }} />}
    </div>
  );
}

export default PetCard;
