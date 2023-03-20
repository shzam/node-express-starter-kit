import Joi from 'joi';
import { JoiObjectId } from '@helpers/validator';

export default {
    createUserSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: JoiObjectId()
    }),
    updateUserSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string(),
        role: JoiObjectId()
    }),
    userId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};
