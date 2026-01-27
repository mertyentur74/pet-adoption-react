import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [savedPets, setSavedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [appsRes, savedRes] = await Promise.all([
        api.get('/applications'),
        api.get('/users/me/saved-pets')
      ]);
      setApplications(appsRes.data.data || []);
      setSavedPets(savedRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Welcome, {user?.name}! 👋</h1>

        <div className="dashboard-grid">
          <section className="dashboard-section">
            <h2>My Applications ({applications.length})</h2>
            {applications.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app._id} className="application-card">
                    <h3>{app.pet?.name}</h3>
                    <span className={`badge badge-${app.status}`}>{app.status}</span>
                    <p>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="dashboard-section">
            <h2>Saved Pets ({savedPets.length})</h2>
            {savedPets.length === 0 ? (
              <p>No saved pets yet</p>
            ) : (
              <div className="saved-pets-list">
                {savedPets.map(pet => (
                  <div key={pet._id} className="saved-pet-card">
                    <img src={pet.image} alt={pet.name} />
                    <div>
                      <h4>{pet.name}</h4>
                      <p>{pet.breed}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
