import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import PetCard from '../components/PetCard';
import './PetList.css';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    size: '',
    gender: '',
    search: ''
  });

  useEffect(() => {
    fetchPets();
  }, [filters]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value)
      ).toString();
      const response = await api.get(`/pets?${queryParams}`);
      setPets(response.data.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pet-list-page">
      <div className="container">
        <h1>Find Your Perfect Pet</h1>

        <div className="filters">
          <input
            type="text"
            name="search"
            placeholder="Search by name, breed..."
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />

          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </select>

          <select name="size" value={filters.size} onChange={handleFilterChange}>
            <option value="">All Sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <select name="gender" value={filters.gender} onChange={handleFilterChange}>
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading pets...</p>
          </div>
        ) : pets.length === 0 ? (
          <div className="no-pets">
            <h2>No pets found</h2>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="pets-grid">
            {pets.map(pet => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetList;
