import Joi from 'joi';
import { JoiObjectId } from '@helpers/validator';

export default {
    createUserSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    updateUserSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string()
    }),
    userId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};
