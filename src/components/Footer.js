import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🐾 PetAdopt</h4>
            <p>Find your perfect companion today!</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/pets">Browse Pets</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>

          <div className="footer-section">
            <h4>About</h4>
            <Link to="/">How it Works</Link>
            <Link to="/">Adoption Process</Link>
            <Link to="/">Contact Us</Link>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a 
                href="https://facebook.com" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                📘
              </a>
              <a 
                href="https://twitter.com" 
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐦
              </a>
              <a 
                href="https://instagram.com" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                📷
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 PetAdopt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
