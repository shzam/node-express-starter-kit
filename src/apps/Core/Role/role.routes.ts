import express from 'express';
import { ProtectedRoutes } from '@helpers/auth';
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

router.get('/', ProtectedRoutes, GetAllRoles);

router.get(
    '/:id',
    ProtectedRoutes,
    validator(schema.roleId, ValidationSource.PARAM),
    GetRole
);

router.post('/', ProtectedRoutes, validator(schema.roleId), CreateRole);

router.put(
    '/:id',
    ProtectedRoutes,
    validator(schema.roleId, ValidationSource.PARAM),
    validator(schema.roleSchema),
    UpdateRole
);

router.delete(
    '/:id',
    ProtectedRoutes,
    validator(schema.roleId, ValidationSource.PARAM),
    DeleteRole
);

export default router;
