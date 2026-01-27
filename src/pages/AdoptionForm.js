import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './AdoptionForm.css';

const AdoptionForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [formData, setFormData] = useState({
    applicantInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: ''
    },
    housingInfo: {
      type: 'house',
      ownership: 'own',
      landlordApproval: false,
      yardAccess: false
    },
    experience: {
      hadPetsBefore: false,
      currentPets: '',
      petExperience: ''
    },
    lifestyle: {
      householdMembers: 1,
      childrenAges: '',
      activityLevel: 'moderate',
      timeAlone: ''
    },
    motivation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get(`/pets/${id}`);
        setPet(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split('.');
    
    if (keys.length === 2) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/applications', {
        petId: id,
        ...formData
      });
      alert('Application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting application');
    } finally {
      setLoading(false);
    }
  };

  if (!pet) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="adoption-form-page">
      <div className="container">
        <h1>Adoption Application for {pet.name}</h1>
        
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="adoption-form">
          <section className="form-section">
            <h2>Contact Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="applicantInfo.name"
                  value={formData.applicantInfo.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="applicantInfo.email"
                  value={formData.applicantInfo.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="applicantInfo.phone"
                  value={formData.applicantInfo.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="applicantInfo.address"
                  value={formData.applicantInfo.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Housing Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Housing Type *</label>
                <select
                  name="housingInfo.type"
                  value={formData.housingInfo.type}
                  onChange={handleChange}
                  required
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Do you own or rent? *</label>
                <select
                  name="housingInfo.ownership"
                  value={formData.housingInfo.ownership}
                  onChange={handleChange}
                  required
                >
                  <option value="own">Own</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="housingInfo.yardAccess"
                  checked={formData.housingInfo.yardAccess}
                  onChange={handleChange}
                />
                I have access to a yard
              </label>
            </div>
          </section>

          <section className="form-section">
            <h2>Pet Experience</h2>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="experience.hadPetsBefore"
                  checked={formData.experience.hadPetsBefore}
                  onChange={handleChange}
                />
                I have had pets before
              </label>
            </div>
            <div className="form-group">
              <label>Current Pets</label>
              <input
                type="text"
                name="experience.currentPets"
                value={formData.experience.currentPets}
                onChange={handleChange}
                placeholder="e.g., 1 cat, 2 dogs"
              />
            </div>
          </section>

          <section className="form-section">
            <h2>Lifestyle</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Household Members *</label>
                <input
                  type="number"
                  name="lifestyle.householdMembers"
                  value={formData.lifestyle.householdMembers}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Activity Level *</label>
                <select
                  name="lifestyle.activityLevel"
                  value={formData.lifestyle.activityLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Hours pet will be alone daily *</label>
              <input
                type="text"
                name="lifestyle.timeAlone"
                value={formData.lifestyle.timeAlone}
                onChange={handleChange}
                placeholder="e.g., 4-6 hours"
                required
              />
            </div>
          </section>

          <section className="form-section">
            <h2>Why do you want to adopt {pet.name}?</h2>
            <div className="form-group">
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Tell us why you'd be a great match..."
              />
            </div>
          </section>

          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
