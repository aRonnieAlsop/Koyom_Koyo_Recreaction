const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database'); // Imported sequelize instance
const Program = require('./models/Program');
const multer = require('multer');
const path = require('path');
const jwt = require('express-jwt'); // express-jwt for Auth0 import
const jwksRsa = require('jwks-rsa'); // jwks-rsa to retreive keys


dotenv.config();

const app = express();
app.use(express.json());

// multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); //directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // append timestamp to file name
    }
});

const upload = multer({ storage });

// Middleware to check for JWT using Auth0
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // Use the server-side environment variable
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE, // Set this in your .env if necessary
    issuer: `https://${process.env.AUTH0_DOMAIN}/`, // Use the server-side domain
    algorithms: ['RS256'] // The algorithm you are using
});


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

// Route to create a program --admin only
app.post('/api/programs', checkJwt, checkAdmin, upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const program = await Program.create({ 
            title, 
            image: req.file.path,
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
        res.status(204).send(); //no content to send back
    } catch (err) {
        console.error('Error deleting program:', err);
        res.status(500).json({ error: err.message });
    }
});

// serve static files form the uploads directory
app.use('/uplaods', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
