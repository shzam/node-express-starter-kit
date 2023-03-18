import express from 'express';
import validator, { ValidationSource } from '@helpers/validator';
import { ProtectRoutes } from '@helpers/auth';

import {
    CreatePermission,
    DeletePermissionByID,
    GetAllPermission,
    GetPermission,
    UpdatePermission
} from './permission.controller';
import schema from './permission.schema';

const router = express.Router();

router.get('/', ProtectRoutes, GetAllPermission);

router.get(
    '/:id',
    ProtectRoutes,
    validator(schema.permissionId, ValidationSource.PARAM),
    GetPermission
);

router.post(
    '/',
    ProtectRoutes,
    validator(schema.permissionSchema),
    CreatePermission
);

router.put(
    '/:id',
    ProtectRoutes,
    validator(schema.permissionId, ValidationSource.PARAM),
    validator(schema.permissionSchema),
    UpdatePermission
);

router.delete(
    '/:id',
    validator(schema.permissionId, ValidationSource.PARAM),
    DeletePermissionByID
);

router.delete(
    '/',
    validator(schema.permissionIds, ValidationSource.BODY),
    DeletePermissionByID
);

export default router;
