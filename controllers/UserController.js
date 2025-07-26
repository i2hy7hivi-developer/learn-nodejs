const { userSchema } = require('../validators/userValidator');

exports.getUser = (req, res) => {
    const name = req.query.name || 'Guest';
    const role = req.query.role || 'Visitor';

    const user = { name, role };

    res.status(200).json(user);
}

exports.createUser = (req, res) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(422).json({ error: error.details[0].message });
    }

    const { name, role } = value;

    res.status(201).json({
        message: 'User created successfully',
        user: { name, role }
    });
};