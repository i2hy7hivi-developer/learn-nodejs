const User = require('../models/User');
const { userSchema } = require('../validators/userValidator');

exports.createUser = async (req, res) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(422).json({ error: error.details[0].message });
    }

    try {
        const user = await User.create(value);
        res.status(201).json({
            message: 'User saved to MongoDB',
            user
        });
    } catch (err) {
        res.status(500).json({ error: 'DB Error', details: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id);
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { deleted_at: new Date() },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Delete failed', details: err.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.getUser = (req, res) => {
    const name = req.query.name || 'Guest';
    const role = req.query.role || 'Visitor';

    const user = { name, role };

    res.status(200).json(user);
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Invalid user ID' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated', user });
    } catch (err) {
        res.status(400).json({ error: 'Update failed', details: err.message });
    }
};
