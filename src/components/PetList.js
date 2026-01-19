import React from 'react';
import PetCard from './PetCard';

function PetList({ pets, removePet }) {
  return (
    <div>
      {pets.length === 0 ? (
        <p>No pets available. Add some!</p>
      ) : (
        pets.map((pet, index) => (
          <PetCard key={index} pet={pet} index={index} removePet={removePet} />
        ))
      )}
    </div>
  );
}

export default PetList;

