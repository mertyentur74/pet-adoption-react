import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Companion</h1>
          <p>Thousands of pets are waiting for their forever home. Start your adoption journey today!</p>
          <div className="hero-buttons">
            <Link to="/pets">
              <button className="btn btn-primary btn-large">Browse Pets</button>
            </Link>
            <Link to="/add-pet">
              <button className="btn btn-outline btn-large">Add Pet</button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">🔍</div>
              <h3>Search</h3>
              <p>Browse through our database of adorable pets looking for homes</p>
            </div>
            <div className="step">
              <div className="step-icon">❤️</div>
              <h3>Connect</h3>
              <p>Find your perfect match and submit an adoption application</p>
            </div>
            <div className="step">
              <div className="step-icon">🏡</div>
              <h3>Adopt</h3>
              <p>Welcome your new family member into your loving home</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="featured-pets">
        <div className="container">
          <h2>Why Choose Pet Adoption?</h2>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">🐾</div>
              <h3>Save a Life</h3>
              <p>Give a rescued pet a second chance at happiness</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>Cost-Effective</h3>
              <p>Adoption fees are much lower than buying from breeders</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏥</div>
              <h3>Health Checked</h3>
              <p>All pets are vaccinated and health-screened before adoption</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🤝</div>
              <h3>Support Network</h3>
              <p>Get ongoing support from our community of pet lovers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your New Best Friend?</h2>
          <p>Start your adoption journey today and make a difference in a pet's life</p>
          <Link to="/pets">
            <button className="btn btn-primary btn-large">Start Browsing</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
