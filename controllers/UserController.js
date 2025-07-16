exports.getUser = (req, res) => {
    const name = req.query.name || 'Guest';
    const role = req.query.role || 'Visitor';

    const user = { name, role };

    res.status(200).json(user);
}

exports.createUser = (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ error: 'Name and role are required' });
    }

    res.status(201).json({
        message: 'User created',
        user: { name, role }
    });
}