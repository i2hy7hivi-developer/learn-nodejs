const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    role: Joi.string().valid('Admin', 'User', 'Manager').required()
});

module.exports = { userSchema };
