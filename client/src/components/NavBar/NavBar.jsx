import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Update this with your own styles

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/path-to-facebook-icon.png" alt="Facebook" className="social-icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/path-to-instagram-icon.png" alt="Instagram" className="social-icon" />
        </a>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/createuser">Create User</Link>
      </div>
    </nav>
  );
}

export default NavBar;
