import React from 'react';
import NavBar from './../NavBar/NavBar';
import './Header.css'; 

const Header = () => {
    return (
        <header>
            <NavBar />
            <div class="header-container">
             <h1>KOYOM KOYO</h1>
            <h2>Parks & Recreation</h2>   
            </div>
            
        </header>
    );
};

export default Header;
