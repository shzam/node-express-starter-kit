import express from 'express';
import validator, { ValidationSource } from '@helpers/validator';
import { ProtectRoutes } from '@helpers/auth';
import permission from '@helpers/permission';

import { COLLECTION_NAME } from './model/user.model';
import {
    CreateUser,
    DeleteUser,
    GetUser,
    GetUsers,
    UpdateUser
} from './user.controller';
import schema from './user.schema';

const router = express.Router();

router.get('/', permission(COLLECTION_NAME, 'read'), ProtectRoutes, GetUsers);

router.get(
    '/:id',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'read'),
    validator(schema.userId, ValidationSource.PARAM),
    GetUser
);

router.post(
    '/',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'create'),
    validator(schema.createUserSchema),
    CreateUser
);

router.put(
    '/:id',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'update'),
    validator(schema.userId, ValidationSource.PARAM),
    validator(schema.updateUserSchema),
    UpdateUser
);

router.delete(
    '/:id',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'delete'),
    validator(schema.userId, ValidationSource.PARAM),
    DeleteUser
);

export default router;
