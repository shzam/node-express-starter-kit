import Joi from 'joi';
import { JoiObjectId } from '@helpers/validator';

export default {
    registerUserSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    loginUserSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string()
    })
};
