const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,

}) 
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process on MongoDB connection error
    });

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for serving static files (like CSS, images)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Example API route to get pantry items
app.get('/api/pantry/items', (req, res) => {
    // Simulated pantry items (replace with database logic)
    let pantryItems = [
        { name: 'Rice', quantity: 2 },
        { name: 'Beans', quantity: 3 },
        { name: 'Tomatoes', quantity: 5 }
    ];
    res.json(pantryItems);
});

// Example API route to add a new pantry item
app.post('/api/pantry/add', (req, res) => {
    // Logic to add a new pantry item to your database (replace with actual logic)
    console.log(req.body); // Assuming req.body contains item data
    // Perform database operation and respond
    res.json({ message: 'Item added successfully' });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        server.close(() => {
            console.log('Server shut down');
            process.exit(0);
        });
    } catch (err) {
        console.error('Error during graceful shutdown:', err);
        process.exit(1);
    }
});
