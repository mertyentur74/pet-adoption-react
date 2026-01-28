import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          {/* Dropdown Menu on Left */}
          <div className="nav-left">
            <button 
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-label="Menu"
            >
              ☰ Menu
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                <Link to="/register" onClick={closeMobileMenu}>Sign Up</Link>
                <Link to="/about" onClick={closeMobileMenu}>Who We Are</Link>
                <Link to="/add-pet" onClick={closeMobileMenu}>Add Pet</Link>
                <Link to="/health" onClick={closeMobileMenu}>Check Connection</Link>
              </div>
            )}
          </div>

          {/* Logo in Center */}
          <Link to="/" className="logo-center" onClick={closeMobileMenu}>
            <img src="/logo.jpg" alt="Pet Adopt Logo" className="logo-img" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Right Side Links */}
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
            <Link to="/pets" onClick={closeMobileMenu}>Find Pets</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
                <span className="user-name">Hi, {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
