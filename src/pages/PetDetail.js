import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './PetDetail.css';

const PetDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPet = useCallback(async () => {
    try {
      const response = await api.get(`/pets/${id}`);
      setPet(response.data.data);
    } catch (error) {
      console.error('Error fetching pet:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPet();
  }, [fetchPet]);

  const handleAdopt = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/adopt/${id}`);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!pet) {
    return <div className="container"><h2>Pet not found</h2></div>;
  }

  return (
    <div className="pet-detail">
      <div className="container">
        <div className="pet-detail-grid">
          <div className="pet-image-section">
            <img src={pet.image} alt={pet.name} />
          </div>
          
          <div className="pet-info-section">
            <h1>{pet.name}</h1>
            <span className={`badge badge-${pet.status}`}>{pet.status}</span>
            
            <div className="pet-specs">
              <div className="spec"><strong>Breed:</strong> {pet.breed}</div>
              <div className="spec"><strong>Age:</strong> {pet.age} years</div>
              <div className="spec"><strong>Gender:</strong> {pet.gender}</div>
              <div className="spec"><strong>Size:</strong> {pet.size}</div>
              <div className="spec"><strong>Color:</strong> {pet.color}</div>
            </div>

            <div className="pet-health">
              <h3>Health Information</h3>
              <div className="health-badges">
                {pet.vaccinated && <span className="badge badge-success">✓ Vaccinated</span>}
                {pet.neutered && <span className="badge badge-success">✓ Neutered</span>}
                {pet.houseTrained && <span className="badge badge-success">✓ House Trained</span>}
              </div>
            </div>

            <div className="pet-description">
              <h3>About {pet.name}</h3>
              <p>{pet.description}</p>
            </div>

            <div className="pet-compatibility">
              <h3>Compatibility</h3>
              {pet.goodWithKids && <p>✓ Good with children</p>}
              {pet.goodWithPets && <p>✓ Good with other pets</p>}
            </div>

            <div className="pet-actions">
              {pet.status === 'available' && (
                <button onClick={handleAdopt} className="btn btn-primary btn-large">
                  Apply to Adopt 🐾
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
