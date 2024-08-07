import React, { useState } from 'react';
import axios from '../api/axios';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users', { name, email });
            console.log('User created:', response.data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateUser;