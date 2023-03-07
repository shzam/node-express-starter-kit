import express from 'express';
import validator, { ValidationSource } from '@helpers/validator';

import {
    CreatePermission,
    DeletePermissionByID,
    GetAllPermission,
    GetPermission,
    UpdatePermission
} from './permission.controller';
import schema from './permission.schema';

const router = express.Router();

router.get('/', GetAllPermission);

router.get(
    '/:id',
    validator(schema.permissionId, ValidationSource.PARAM),
    GetPermission
);

router.post('/', validator(schema.permissionSchema), CreatePermission);

router.put(
    '/:id',
    validator(schema.permissionId, ValidationSource.PARAM),
    validator(schema.permissionSchema),
    UpdatePermission
);

router.delete(
    '/:id',
    validator(schema.permissionId, ValidationSource.PARAM),
    DeletePermissionByID
);

export default router;
