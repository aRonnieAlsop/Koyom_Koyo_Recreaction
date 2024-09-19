const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const Program = require('./models/Program');

dotenv.config()

const app = express();
app.use(express.json());

// Sequlize set up
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// database connection test
sequelize.authenticate()
    .then(() => console.log('SQLite connected'))
    .catch(err => console.log('Error connection to SQlite', err));

// // defined model
// const User = sequelize.define('User', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

// Model synced with the database

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.log('Error syncing database:', err));

// Routes
app.get('/', (req, res) => res.send('API is running'));

// // Route to create a user
// app.post('/users', async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const user = await User.create({ name, email });
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Route to get all users
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// Route to get all programs
app.get('/api/programs', async (req, res) => {
    try {
        const programs = await Program.findAll();
        res.json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Route to create a program
app.post('/api/programs', async (req, res) => {
    try {
        const { title, image, description } = req.body;
        const program = await Program.create({ title, image, description });
        res.json(program);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));