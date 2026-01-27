import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './AddPet.css';

const AddPet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    gender: 'male',
    size: 'medium',
    color: '',
    description: '',
    location: '',
    vaccinated: false,
    neutered: false,
    houseTrained: false,
    goodWithKids: false,
    goodWithPets: false,
    contactPhone: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate phone number
    if (!formData.contactPhone) {
      setError('Please provide your contact phone number');
      setLoading(false);
      return;
    }

    try {
      // For now, we'll use a placeholder image URL if no image is uploaded
      // In production, you'd upload to a service like Cloudinary
      const petData = {
        ...formData,
        image: imagePreview || 'https://via.placeholder.com/400x300?text=Pet+Image',
        shelter: '000000000000000000000000', // Placeholder shelter ID
        medicalHistory: formData.description,
        adoptionFee: 0
      };

      await api.post('/pets', petData);
      
      setSuccess('Pet added successfully! Our team will review and publish it soon.');
      
      // Reset form
      setFormData({
        name: '',
        type: 'dog',
        breed: '',
        age: '',
        gender: 'male',
        size: 'medium',
        color: '',
        description: '',
        location: '',
        vaccinated: false,
        neutered: false,
        houseTrained: false,
        goodWithKids: false,
        goodWithPets: false,
        contactPhone: ''
      });
      setImagePreview('');
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/pets');
      }, 3000);
      
    } catch (error) {
      console.error('Error adding pet:', error);
      setError(error.response?.data?.message || 'Error adding pet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-pet-page">
      <div className="container">
        <h1>Add a Pet for Adoption</h1>
        <p className="subtitle">Help a pet find their forever home! No account required.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="add-pet-form">
          {/* Basic Information */}
          <section className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Pet Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Buddy"
                />
              </div>

              <div className="form-group">
                <label>Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Breed *</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Golden Retriever"
                />
              </div>

              <div className="form-group">
                <label>Age (years) *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="0"
                  max="30"
                  placeholder="e.g., 3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Size *</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Color *</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Brown and White"
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Houston, TX"
                />
              </div>
            </div>
          </section>

          {/* Photo Upload */}
          <section className="form-section">
            <h2>Photo</h2>
            <div className="form-group">
              <label>Upload Pet Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Pet preview" />
                </div>
              )}
            </div>
          </section>

          {/* Description */}
          <section className="form-section">
            <h2>Description & Personality</h2>
            <div className="form-group">
              <label>Tell us about this pet *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Describe the pet's personality, habits, and any special needs..."
              />
            </div>
          </section>

          {/* Health & Behavior */}
          <section className="form-section">
            <h2>Health & Behavior</h2>
            <div className="checkbox-grid">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="vaccinated"
                  checked={formData.vaccinated}
                  onChange={handleChange}
                />
                Vaccinated
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="neutered"
                  checked={formData.neutered}
                  onChange={handleChange}
                />
                Neutered/Spayed
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="houseTrained"
                  checked={formData.houseTrained}
                  onChange={handleChange}
                />
                House Trained
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="goodWithKids"
                  checked={formData.goodWithKids}
                  onChange={handleChange}
                />
                Good with Kids
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="goodWithPets"
                  checked={formData.goodWithPets}
                  onChange={handleChange}
                />
                Good with Other Pets
              </label>
            </div>
          </section>

          {/* Contact Information */}
          <section className="form-section">
            <h2>Your Contact Information</h2>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                placeholder="e.g., (555) 123-4567"
              />
              <small>We'll use this to contact you about the pet</small>
            </div>
          </section>

          <button 
            type="submit" 
            className="btn btn-primary btn-large btn-block" 
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Pet for Adoption'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
