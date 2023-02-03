const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri()

const createProductShema = Joi.object({
   name: name.required(),
   price: price.required(),
   image: image.required(),
})

const updateProductShema = Joi.object({
   name: name,
   price: price,
   image: image,
})

const getProductShema = Joi.object({
   id: id.required(),
})

module.exports = { createProductShema, updateProductShema, getProductShema }
