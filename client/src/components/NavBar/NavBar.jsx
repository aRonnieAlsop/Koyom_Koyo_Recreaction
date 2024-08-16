import React from 'react';
import './NavBar.css'; 

import faceBookIcon from './../../assets/faceBook.png'
import instagramIcon from './../../assets/instagram.png';

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-left">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={faceBookIcon} alt="Facebook" className="social-icon"/>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="social-icon"/>
          </a>
        </div>
        <div className="navbar-right">
          <div className="menu-container">
            <span className="menu-icon">≣</span>
            <div className="menu">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            </div>
          </div>
          </div>
      </nav>
    );
  };
  
  export default NavBar;
