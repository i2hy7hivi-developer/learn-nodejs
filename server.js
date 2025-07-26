const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/learn_nodejs', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Node.js server!');
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});