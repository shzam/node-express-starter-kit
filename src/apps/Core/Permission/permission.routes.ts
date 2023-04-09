import express from 'express';
import validator, { ValidationSource } from '@helpers/validator';
import { ProtectRoutes } from '@helpers/auth';
import permission from '@helpers/permission';

import { COLLECTION_NAME } from './model/permissions.model';
import {
    CreatePermission,
    DeletePermissionByID,
    GetAllPermission,
    GetPermission,
    UpdatePermission
} from './permission.controller';
import schema from './permission.schema';

const router = express.Router();

router.get(
    '/',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'read'),
    GetAllPermission
);

router.get(
    '/:id',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'read'),
    validator(schema.permissionId, ValidationSource.PARAM),
    GetPermission
);

router.post(
    '/',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'read'),
    validator(schema.permissionSchema),
    CreatePermission
);

router.put(
    '/:id',
    ProtectRoutes,
    permission(COLLECTION_NAME, 'read'),
    validator(schema.permissionId, ValidationSource.PARAM),
    validator(schema.permissionSchema),
    UpdatePermission
);

router.delete(
    '/:id',
    permission(COLLECTION_NAME, 'read'),
    validator(schema.permissionId, ValidationSource.PARAM),
    DeletePermissionByID
);

router.delete(
    '/',
    permission(COLLECTION_NAME, 'read'),
    validator(schema.permissionIds, ValidationSource.BODY),
    DeletePermissionByID
);

export default router;
