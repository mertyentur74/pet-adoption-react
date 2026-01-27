import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img src="/logo.jpg" alt="Pet Adopt" className="footer-logo" />
            <p className="footer-tagline">Find Your Forever Companion Today!</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/pets">Browse Pets</Link>
            <Link to="/add-pet">Add Pet</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>

          <div className="footer-section">
            <h4>About</h4>
            <Link to="/about">Who We Are</Link>
            <Link to="/">How it Works</Link>
            <Link to="/">Adoption Process</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 PetAdopt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
