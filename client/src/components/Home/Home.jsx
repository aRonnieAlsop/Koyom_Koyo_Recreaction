import React, {useState, useEffect } from 'react';
import './../Home/Home.css';

const images = [
    require('./../../assets/HomeImages/image2.jpg'),
    require('./../../assets/HomeImages/image3.jpg'),
    require('./../../assets/HomeImages/image4.jpg'),
    require('./../../assets/HomeImages/image5.jpg'),
    require('./../../assets/HomeImages/image6.jpg'),
    require('./../../assets/HomeImages/image7.jpg'),
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">
            <img src={images[currentImage]} alt="Park" className="home-image" />
        </div>
    );
};

export default Home;