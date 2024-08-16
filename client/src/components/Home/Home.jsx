import React from 'react';
import './../Home/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <img src={require('./../../assets/HomeImages/th.jpg')} alt="Park" className="home-image" />
        </div>
    );
};

export default Home;