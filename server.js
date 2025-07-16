const express = require('express');

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Node.js server!');
});

app.get('/user', (req, res) => {
    const name = req.query.name || 'Guest';
    const role = req.query.role || 'Visitor';

    const user = { name, role };

    res.status(200).json(user);
});

app.get('/time', (req, res) => {
    const date = new Date();

    const datetime = { date };

    res.status(200).json(datetime);
});

app.post('/user', (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ error: 'Name and role are required' });
    }

    res.status(201).json({
        message: 'User created',
        user: { name, role }
    });
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});