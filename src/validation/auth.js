import Joi from 'joi';

export const authRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const resetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required(),
});
