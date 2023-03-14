import express from 'express';
import validator, { ValidationSource } from '@helpers/validator';
import { ProtectRoutes } from '@helpers/auth';

import {
    CreateUser,
    DeleteUser,
    GetUser,
    GetUsers,
    UpdateUser
} from './user.controller';
import schema from './user.schema';

const router = express.Router();

router.get('/', ProtectRoutes, GetUsers);

router.get(
    '/:id',
    ProtectRoutes,
    validator(schema.userId, ValidationSource.PARAM),
    GetUser
);

router.post('/', ProtectRoutes, validator(schema.createUserSchema), CreateUser);

router.put(
    '/:id',
    ProtectRoutes,
    validator(schema.userId, ValidationSource.PARAM),
    validator(schema.updateUserSchema),
    UpdateUser
);

router.delete(
    '/:id',
    ProtectRoutes,
    validator(schema.userId, ValidationSource.PARAM),
    DeleteUser
);

export default router;
