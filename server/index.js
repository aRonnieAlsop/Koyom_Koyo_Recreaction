const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database'); // Import your Sequelize instance
const Program = require('./models/Program');

dotenv.config();

const app = express();
app.use(express.json());

// Database connection test
sequelize.authenticate()
    .then(() => console.log('SQLite connected'))
    .catch(err => console.log('Error connecting to SQLite:', err));

// Sync the database and create tables
sequelize.sync({ force: true }) // Use force: true for testing (drops existing tables)
    .then(() => console.log('Database synchronized'))
    .catch(err => console.log('Error syncing database:', err));

// Routes
app.get('/', (req, res) => res.send('API is running'));

// Route to get all programs
app.get('/api/programs', async (req, res) => {
    try {
        const programs = await Program.findAll();
        res.json(programs);
    } catch (err) {
        console.error('Error fetching programs:', err);
        res.status(500).json({ error: err.message });
    }
});

// Route to create a program
app.post('/api/programs', async (req, res) => {
    try {
        const { title, image, description } = req.body;
        const program = await Program.create({ title, image, description });
        res.json(program);
    } catch (err) {
        console.error('Error creating program:', err);
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a program
app.delete('/api/programs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Program.destroy({ where: { id } });
        res.status(204).send(); //no content to send back
    } catch (err) {
        console.error('Error deleting program:', err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
