import express from 'express';
import { ProtectRoutes } from '@helpers/auth';
import validator, { ValidationSource } from '@helpers/validator';

import {
    CreateRole,
    DeleteRole,
    GetAllRoles,
    GetRole,
    UpdateRole
} from './role.controller';
import schema from './role.schema';

const router = express.Router();

router.get('/', ProtectRoutes, GetAllRoles);

router.get(
    '/:id',
    ProtectRoutes,
    validator(schema.roleId, ValidationSource.PARAM),
    GetRole
);

router.post('/', ProtectRoutes, validator(schema.roleSchema), CreateRole);

router.put(
    '/:id',
    ProtectRoutes,
    validator(schema.roleId, ValidationSource.PARAM),
    validator(schema.roleSchema),
    UpdateRole
);

router.delete(
    '/:id',
    ProtectRoutes,
    validator(schema.roleId, ValidationSource.PARAM),
    DeleteRole
);

export default router;
