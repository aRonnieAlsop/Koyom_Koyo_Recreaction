import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>123 Business Address, City, State, ZIP </p>
                </div>
                <div className="footer-right">
                    <Link to="/admin-login" className="admin-link">Admin Login</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;