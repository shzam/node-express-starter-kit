import Joi from 'joi';
import { JoiObjectId } from '@helpers/validator';

export default {
    userSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    userId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};
