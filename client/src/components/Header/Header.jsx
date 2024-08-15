import React from 'react';
import NavBar from './../NavBar/NavBar';
import './Header.css'; // If you have custom styles

const Header = () => {
    return (
        <header>
            <NavBar />
            <h1>Koyom Koyo Parks & Recreation</h1>
        </header>
    );
};

export default Header;
