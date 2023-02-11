const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(255);
const description = Joi.string().min(10);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri()

const createProductSchema = Joi.object({
   name: name.required(),
   description: description.required(),
   price: price.required(),
   image: image.required(),
})

const updateProductSchema = Joi.object({
   name: name,
   description: description.required(),
   price: price,
   image: image,
})

const getProductSchema = Joi.object({
   id: id.required(),
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
