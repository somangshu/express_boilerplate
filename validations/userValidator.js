var Joi = require('joi');
module.exports = {
    create: Joi.object().keys({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15).required(),
        phone: Joi.string().min(10).max(10).required(),
        address: Joi.string().required(),
        pic: Joi.string(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        lat_long: Joi.string().required(),
        cusine: Joi.object().keys({
            slug_collection: Joi.array().items(Joi.string()),
            name_collection: Joi.array().items(Joi.string())
        }).required(),
        dishes: Joi.object().keys({
            slug_collection: Joi.array().items(Joi.string()),
            name_collection: Joi.array().items(Joi.string())
        }).required(),
        followers: Joi.array().items(Joi.string()),
        following: Joi.array().items(Joi.string()),
    })
};