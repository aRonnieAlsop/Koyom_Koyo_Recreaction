const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database'); // Imported sequelize instance
const Program = require('./models/Program');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs'); // Don't forget to import fs

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins
}));

// Ensure the uploads directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
    }
});

const upload = multer({ storage });

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

// Route to create a program (no authentication)
app.post('/api/programs', upload.single('image'), async (req, res) => {
    console.log('Received request to add program:', req.body); // Log the body
    console.log('Uploaded file:', req.file); // Log the uploaded file
    try {
        const { title, description } = req.body;
        const program = await Program.create({ 
            title, 
            image: req.file.path, // Ensure this is the correct path
            description 
        });
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
        res.status(204).send(); // no content to send back
    } catch (err) {
        console.error('Error deleting program:', err);
        res.status(500).json({ error: err.message });
    }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads')); // Corrected typo from 'uplaods' to 'uploads'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
