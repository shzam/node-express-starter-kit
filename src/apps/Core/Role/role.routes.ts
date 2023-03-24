import express from 'express';
import { ProtectRoutes } from '@helpers/auth';
import validator, { ValidationSource } from '@helpers/validator';
import permission from '@helpers/permission';

import { COLLECTION_NAME } from './model/role.model';
import {
    CreateRole,
    DeleteRole,
    GetAllRoles,
    GetRole,
    UpdateRole
} from './role.controller';
import schema from './role.schema';

const router = express.Router();

router.get(
    '/',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'read'),
    GetAllRoles
);

router.get(
    '/:id',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'read'),
    validator(schema.roleId, ValidationSource.PARAM),
    GetRole
);

router.post(
    '/',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'create'),
    validator(schema.roleSchema),
    CreateRole
);

router.put(
    '/:id',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'update'),
    validator(schema.roleId, ValidationSource.PARAM),
    validator(schema.roleSchema),
    UpdateRole
);

router.delete(
    '/:id',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'delete'),
    validator(schema.roleId, ValidationSource.PARAM),
    DeleteRole
);

export default router;
