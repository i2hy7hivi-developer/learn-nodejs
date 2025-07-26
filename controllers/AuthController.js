const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { loginSchema, registerSchema } = require('../validators/authValidator');
const { successResponse, errorResponse } = require('../utils/response');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            return errorResponse(res, 422, error.details[0].message);
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response
        return successResponse(res, 200, 'Login successful', { token });
    } catch (err) {
        return errorResponse(res, 500, 'Internal server error', null, { error: err.message });
    }
};

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
