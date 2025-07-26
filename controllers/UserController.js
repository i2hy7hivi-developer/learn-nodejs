const User = require('../models/User');
const { userSchema } = require('../validators/userValidator');

exports.getUser = (req, res) => {
    const name = req.query.name || 'Guest';
    const role = req.query.role || 'Visitor';

    const user = { name, role };

    res.status(200).json(user);
}

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