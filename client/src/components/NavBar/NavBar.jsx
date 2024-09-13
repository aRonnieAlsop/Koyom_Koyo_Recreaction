import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './NavBar.css'; 

import faceBookIcon from './../../assets/faceBook.png'
import instagramIcon from './../../assets/instagram.png';

const NavBar = () => {

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
            <a href="/schedule">Schedule</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            {isAuthenticated ? (
                            <>
                                <a href="/scheduler">Scheduler</a>
                                <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
                            </>
                        ) : (
                            <button onClick={() => loginWithRedirect()}>Admin Login</button>
                        )}
            </div>
          </div>
          </div>
      </nav>
    );
  };
  
  export default NavBar;
