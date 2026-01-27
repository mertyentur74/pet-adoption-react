import React from 'react';
import { Link } from 'react-router-dom';
import './PetCard.css';

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <div className="pet-image">
        <img src={pet.image || 'https://via.placeholder.com/300'} alt={pet.name} />
        <span className={`pet-status ${pet.status}`}>{pet.status}</span>
      </div>
      <div className="pet-info">
        <h3>{pet.name}</h3>
        <div className="pet-details">
          <span>🐾 {pet.breed}</span>
          <span>📅 {pet.age} years</span>
          <span>⚧ {pet.gender}</span>
        </div>
        <p className="pet-description">
          {pet.description.substring(0, 100)}...
        </p>
        <div className="pet-footer">
          <span className="pet-location">📍 {pet.location}</span>
          <Link to={`/pets/${pet._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
