import express from 'express';
import validator, { ValidationSource } from '@helpers/validator';

import {
    CreateUser,
    DeleteUser,
    GetUser,
    GetUsers,
    UpdateUser
} from './user.controller';
import schema from './user.schema';

const router = express.Router();

router.get('/', GetUsers);

router.get('/:id', validator(schema.userId, ValidationSource.PARAM), GetUser);

router.post('/', validator(schema.userSchema), CreateUser);

router.put(
    '/:id',
    validator(schema.userId, ValidationSource.PARAM),
    validator(schema.userSchema),
    UpdateUser
);

router.delete(
    '/:id',
    validator(schema.userId, ValidationSource.PARAM),
    DeleteUser
);

export default router;
