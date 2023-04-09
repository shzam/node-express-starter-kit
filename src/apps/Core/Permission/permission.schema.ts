import Joi from 'joi';
import { JoiObjectId } from '@helpers/validator';

export default {
    permissionSchema: Joi.object().keys({
        resource: Joi.string().required(),
        action: Joi.string()
            .valid('create', 'read', 'view', 'update')
            .required(),
        attributes: Joi.array().items(Joi.string()).optional()
    }),
    permissionId: Joi.object().keys({
        id: JoiObjectId().required()
    }),
    permissionIds: Joi.object().keys({
        ids: Joi.array().items(JoiObjectId().required()).required()
    })
};
