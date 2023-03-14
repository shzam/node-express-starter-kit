import Joi from 'joi';
import { JoiObjectId } from '@helpers/validator';

export default {
    roleSchema: Joi.object().keys({
        roleName: Joi.string().required(),
        permissions: Joi.array().items(JoiObjectId().required()).required()
    }),
    roleId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};
