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

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World');
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
