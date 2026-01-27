import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Companion</h1>
          <p className="hero-subtitle">
            Thousands of pets are waiting for a loving home. Start your adoption journey today!
          </p>
          <div className="hero-buttons">
            <Link to="/pets">
              <button className="btn btn-primary btn-large">Browse Pets</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-outline btn-large">Get Started</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Adopt?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>Save a Life</h3>
              <p>Give a homeless pet a second chance at happiness</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Find Your Match</h3>
              <p>Search by breed, age, size, and personality</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Simple Process</h3>
              <p>Easy application and approval process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Ongoing Support</h3>
              <p>Get help and resources after adoption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Pets Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Happy Adoptions</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Partner Shelters</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Make a Difference?</h2>
          <p>Start your adoption journey today and give a pet the loving home they deserve.</p>
          <Link to="/pets">
            <button className="btn btn-primary btn-large">Find Your Pet</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
