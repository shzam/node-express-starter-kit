import Joi from 'joi';
import { JoiObjectId } from '@helpers/validator';

export default {
    permissionSchema: Joi.object().keys({
        resource: Joi.string().required(),
        actions: Joi.array()
            .items({
                attributes: Joi.string().required(),
                action: Joi.string()
                    .valid('create', 'read', 'view', 'update')
                    .required()
            })
            .required()
    }),
    permissionId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};
