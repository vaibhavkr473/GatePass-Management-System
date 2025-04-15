const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db'); // MongoDB connection
const userRoutes = require('./routes/userRoutes');
const gatePassRoutes = require('./routes/gatePassRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const otpRoutes = require('./routes/otpRoutes');

const app = express();

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Use CORS middleware
app.use(cors()); 

app.use(express.json()); 

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/gatepasses', gatePassRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/otp', otpRoutes);

// Root route
app.get('/', (req, res) => {
    res.send(`Server is running on port ${process.env.PORT || 5000}`);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB URI: ${process.env.MONGO_URI ? 'Configured' : 'Not configured'}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});
