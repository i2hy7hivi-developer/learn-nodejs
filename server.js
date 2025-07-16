const express = require('express');

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

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