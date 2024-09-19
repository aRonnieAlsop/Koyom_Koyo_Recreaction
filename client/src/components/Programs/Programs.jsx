import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Programs.css';

import poolImage from './../../assets/ProgramImages/pool_stock_image.jpg';
import soccerImage from './../../assets/ProgramImages/soccer_stock_image.jpg';
import tennisImage from './../../assets/ProgramImages/Tennis_Court_Stock.avif';
import legoImage from './../../assets/ProgramImages/Lego_Fair_Stock.jpg';
import pickleballImage from './../../assets/ProgramImages/Pickleball_Stock_img.png';
import artImage from './../../assets/ProgramImages/Art_In_The_Park_Stock_Img.jpg';
import softballMenImage from './../../assets/ProgramImages/Mens_Softball_Stock_Img.jpg';
import softballWomenImage from './../../assets/ProgramImages/Womens_Softball_stock_img.jpg';
import roboticsImage from './../../assets/ProgramImages/Robots_Stock_Img.jpg';

const initialPrograms = [
    { id: 1, title: 'Swim Lessons', image: poolImage, description: 'Details about Swim Lessons' },
    { id: 2, title: 'Soccer Camp', image: soccerImage, description: 'Details about Soccer Camp' },
    { id: 3, title: 'Tennis Lessons', image: tennisImage, description: 'Details about Tennis Lessons' },
    { id: 4, title: 'Lego Fair', image: legoImage, description: 'Details about Lego Fair' },
    { id: 5, title: 'Pickleball Tournament', image: pickleballImage, description: 'Details about Pickleball Tournament' },
    { id: 6, title: 'Art in the Park', image: artImage, description: 'Details about Art in the Park' },
    { id: 7, title: 'Men\'s Softball', image: softballMenImage, description: 'Details about Men\'s Softball' },
    { id: 8, title: 'Women\'s Softball', image: softballWomenImage, description: 'Details about Women\'s Softball' },
    { id: 9, title: 'Robotics Workshop', image: roboticsImage, description: 'Details about Robotics Workshop' },
];

const Programs = () => {
    const { isAuthenticated } = useAuth0();
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newProgram, setNewProgram] = useState({ title: '', image: '', description: '' });

    useEffect(() => {
        const storedPrograms = localStorage.getItem('programs');
        if (storedPrograms) {
            setPrograms(JSON.parse(storedPrograms));
        } else {
            setPrograms(initialPrograms); // Fall back if nothing is in storage
        }
    }, []);

    const handleProgramClick = (program) => {
        setSelectedProgram(program);
    };

    const handleClose = () => {
        setSelectedProgram(null);
    };

    const handleAddProgramClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
        setNewProgram({ title: '', image: '', description: '' }); // Reset the form
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProgram((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setNewProgram((prev) => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = programs.length + 1; // Simple ID generation
        const updatedPrograms = [...programs, { id: newProgram }]
        setPrograms(updatedPrograms);
        localStorage.setItem('programs', JSON.stringify(updatedPrograms)); //saving to local storage for mock version of site
        handleCloseForm(); // Close the form after submission
    };

    return (
        <div className="programs-page">
            <div className="info-text">Click program for more information</div>
            <div className="programs-grid">
                {programs.map(program => (
                    <div
                        key={program.id}
                        className="program-card"
                        onClick={() => handleProgramClick(program)}
                    >
                        <img src={program.image} alt={program.title} className="program-image" />
                        <div className="program-title">{program.title}</div>
                    </div>
                ))}
            </div>
            {selectedProgram && (
                <div className="program-info-overlay">
                    <div className="program-info">
                        <button className="close-button" onClick={handleClose}>X</button>
                        <h2>{selectedProgram.title}</h2>
                        <p>{selectedProgram.description}</p>
                    </div>
                </div>
            )}
            {isAuthenticated && (
                <button className="add-program-button" onClick={handleAddProgramClick}>
                    Add Programs
                </button>
            )}
            {isFormVisible && (
                <div className="program-form-overlay">
                    <div className="program-form">
                        <button className="close-button" onClick={handleCloseForm}>X</button>
                        <h2>Add New Program</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Program Title"
                                value={newProgram.title}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Program Description"
                                value={newProgram.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                            <button type="submit">Add Program</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Programs;
