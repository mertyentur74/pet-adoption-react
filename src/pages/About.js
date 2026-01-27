import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>Who We Are</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to connecting loving families with pets in need of homes. 
            Our platform makes it easy for anyone to find their perfect companion or help 
            a pet find their forever home.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Do</h2>
          <p>
            We provide a simple, accessible platform where:
          </p>
          <ul>
            <li>Families can browse and adopt pets</li>
            <li>Anyone can list pets for adoption - no account required</li>
            <li>Shelters and rescues can manage their listings</li>
            <li>Communities can come together to help animals in need</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>❤️ Compassion</h3>
              <p>Every pet deserves a loving home</p>
            </div>
            <div className="value-card">
              <h3>🤝 Community</h3>
              <p>Working together to help animals</p>
            </div>
            <div className="value-card">
              <h3>🔍 Transparency</h3>
              <p>Honest information about every pet</p>
            </div>
            <div className="value-card">
              <h3>🎯 Accessibility</h3>
              <p>Easy for everyone to participate</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Join Us</h2>
          <p>
            Whether you're looking to adopt, want to help a pet find a home, or 
            represent a shelter, we're here to make the process simple and rewarding.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
