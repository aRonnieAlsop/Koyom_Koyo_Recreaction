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
    const [isEditing, setIsEditing] = useState(false);
    const [currentProgramId, setCurrentProgramId] = useState(null);
    const [newProgram, setNewProgram] = useState({ title: '', image: '', description: '' });
    const [deletingProgram, setDeletingProgram] = useState(null);
    const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);

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
        setIsEditing(false); //Reset editing state on program click
        setCurrentProgramId(null); // Reset current program ID
    };

    const handleClose = () => {
        setSelectedProgram(null);
    };

    const handleAddProgramClick = () => {
        setIsFormVisible(true);
        setIsEditing(false); // not editing
        setNewProgram({ title: '', image: '', description: '' }); // reset the form
    };
    
    const handleEditClick = () => {
        setNewProgram(selectedProgram); // populate the form with the selected program's details
        setIsEditing(true); // Set editing mode
        setIsFormVisible(true); // show the form
        setCurrentProgramId(selectedProgram.id); //set current program ID
    }

    const handleCloseForm = () => {
        setIsFormVisible(false);
        setNewProgram({ title: '', image: '', description: '' }); // Reset the form
        setIsEditing(false); // reset editing state
        setCurrentProgramId(null); // reset current program ID
        setSelectedProgram(null); // ensure selected program is cleared
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProgram((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setNewProgram((prev) => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(); // FormData to send the file
        formData.append('title', newProgram.title);
        formData.append('description', newProgram.description);
    
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0]; // Get the file from the input
    
        if (file) {
            formData.append('image', file); // Append the file if it exists
        } else {
            console.error('No file selected');
            return; // Exit early if no file is selected
        }
    
        try {
            let response;
            if (isEditing) {
                // Update existing program
                response = await fetch(`http://localhost:5000/api/programs/${currentProgramId}`, { // Use currentProgramId
                    method: 'PUT', 
                    body: formData,
                });
            } else {
                // Create new program
                response = await fetch('http://localhost:5000/api/programs', { 
                    method: 'POST',
                    body: formData,
                });
            }
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const newProgramData = await response.json();
            console.log('Program updated or added:', newProgramData); // Debug log
    
            // Handles the updated or newly created program:
            const updatedPrograms = isEditing
            ? programs.map(prog => (prog.id === newProgramData.id ? newProgramData : prog)) // Update the edited program
            : [...programs, newProgramData]; // Append new program

            setPrograms(updatedPrograms);
            localStorage.setItem('programs', JSON.stringify(updatedPrograms)); // Update local storage

            handleCloseForm(); // Close the form after submission
            setNewProgram({ title: '', image: '', description: '' }); //clear form
    
        } catch (error) {
            console.error('Error adding or updating program:', error);
        }
    };   
    
    const handleDeleteClick = (event, program) => {
        event.stopPropagation(); // to prevent the click from bubbling up the program card
        setDeletingProgram(program);
        setIsConfirmDeleteVisible(true);
    };

    const handleConfirmDelete = async () => {
        // call API to delete the program from the server
        try {
            await fetch(`/api/programs/${deletingProgram.id}`, {
                method: 'DELETE',
            });
            const updatedPrograms = programs.filter(prog => prog.id !== deletingProgram.id);
            setPrograms(updatedPrograms);
            localStorage.setItem('programs', JSON.stringify(updatedPrograms)); // Update local storage
        } catch (error) {
            console.error('Error deleting program:', error);
        } finally {
            setIsConfirmDeleteVisible(false);
            setDeletingProgram(null);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmDeleteVisible(false);
        setDeletingProgram(null);
    };

    return (
        <div className="programs-page">
            <div className="info-text">Click program for more information</div>
            <div className="programs-grid">
    {programs.map(program => (
        <div
            key={`${program.id}-${program.title}`} 
            className="program-card"
            onClick={() => handleProgramClick(program)}
        >
            <img src={`http://localhost:5000/${program.image}`} alt={program.title} className="program-image" />
            <div className="program-title">{program.title}</div>
            {isAuthenticated && (
                <button 
                    className="delete-button" 
                    onClick={(e) => handleDeleteClick(e, program)}
                >
                    X
                </button>
            )}
        </div>
    ))}
</div>

            {selectedProgram && (
                <div className="program-info-overlay">
                    <div className="program-info">
                        <button className="close-button" onClick={handleClose}>X</button>
                        <h2>{selectedProgram.title}</h2>
                        <p>{selectedProgram.description}</p>
                        {isAuthenticated && ( // show the edit button if authenticated
                            <button className="edit-button" onClick={handleEditClick}>
                                Edit
                            </button>
                        )}
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
                        <h2>{isEditing ? 'Edit Program' : 'Add New Program'}</h2>
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
                            <button type="submit">{isEditing ? 'Update Program' : 'Add Program'}</button>
                        </form>
                    </div>
                </div>
            )}
            {isConfirmDeleteVisible && (
                <div className="confirm-delete-overlay">
                    <div className="confirm-delete">
                        <h2>Are you sure you want to delete {deletingProgram.title}?</h2>
                        <button onClick={handleConfirmDelete}>Delete</button>
                        <button onClick={handleCancelDelete}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Programs;
