import Joi from 'joi';
import { JoiObjectId } from '@helpers/validator';

export default {
    demoSchema: Joi.object().keys({
        name: Joi.string().required()
    }),
    demoId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};
