import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().required().messages({
        'any.required': 'Campo name obrigatório.',
        'string.base': 'Somente texto.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'Campo email obrigatório.',
        'string.base': 'Somente texto.',
        'string.email': 'Formato de email inválido.'
    }),
    password: joi.string().min(4).max(16).required().messages({
        'any.required': 'Campo password obrigatório.',
        'string.base': 'Somente texto.',
        'string.min': 'Password mínimo 4 caracteres obrigatórios.',
        'string.max': 'Password máximo 16 caracteres.'
    })
});

const loginShema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'Campo email obrigatório.',
        'string.base': 'Somente texto.',
        'string.email': 'Formato de email inválido.'
    }),
    password: joi.string().min(4).max(16).required().messages({
        'any.required': 'Campo password obrigatório.',
        'string.base': 'Somente texto.',
        'string.min': 'Password mínimo 4 caracteres obrigatórios.',
        'string.max': 'Password máximo 16 caracteres.'
    })
});

export default {
    userSchema,
    loginShema
}
