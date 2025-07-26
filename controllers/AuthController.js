const User = require('../models/User');
const bcrypt = require('bcrypt');
const { registerSchema } = require('../validators/authValidator');
const { successResponse, errorResponse } = require('../utils/response');

exports.register = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            // return res.status(422).json({ error: error.details[0].message });
            return errorResponse(res, 422, error.details[0].message);
        }

        const { name, email, password, role } = value;

        // check existing user
        const existing = await User.findOne({ email });

        if (existing) {
            // return res.status(400).json({ error: 'Email already exists' });
            return errorResponse(res, 400, 'Email already exists');
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // res.status(201).json({ message: 'User registered', user: { id: user._id, name: user.name, email: user.email } });
        return successResponse(res, 201, 'User registered', {
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        // res.status(400).json({ error: 'Registration failed', details: err.message });
        return errorResponse(
            res,
            422,
            error.details[0].message,
            null,
            { error: err.message }
        );
    }
};
