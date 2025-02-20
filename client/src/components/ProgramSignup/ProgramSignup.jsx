import React, { useState } from 'react';

const ProgramSignup = ({ programId }) => {
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ program_id: programId, full_name: fullName, age, special_notes: specialNotes }),
        });

        if (response.ok) {
            setSuccessMessage('You have successfully registered!');
            setFullName('');
            setAge('');
            setSpecialNotes('');
        } else {
            alert('Error registering. Please try again.');
        }
    };

    return (
        <div>
            <h3>Sign Up for This Program</h3>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />

                <label>Special Notes (Allergies, Medical Info, etc.):</label>
                <input type="text" value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default ProgramSignup;
