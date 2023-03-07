import { Types } from 'mongoose';
import { Request, Response } from 'express';
import asyncHandler from '@helpers/asyncHandler';
import { SuccessResponse } from '@core/ApiResponse';

import {
    createPermissions,
    deletePermissionByID,
    findAllPermissionsById,
    findPermissionById,
    getAllPermissions,
    updatedPermissions
} from './model/permission.repository';

export const CreatePermission = asyncHandler(
    async (req: Request, res: Response) => {
        const { resource, actions } = req.body;
        const permission = await createPermissions({
            actions: actions,
            resource: resource
        });

        new SuccessResponse('Permission created successfully', {
            permission
        }).send(res);
    }
);

export const UpdatePermission = asyncHandler(
    async (req: Request, res: Response) => {
        const { resource, actions } = req.body;
        const { id } = req.params;

        const permission = await updatedPermissions({
            _id: id as unknown as Types.ObjectId,
            actions,
            resource
        });

        new SuccessResponse('Permission updated successfully', {
            permission
        }).send(res);
    }
);

export const FindAllPermissionsById = asyncHandler(
    async (req: Request, res: Response) => {
        const { ids } = req.body;
        const permissions = await findAllPermissionsById(ids);

        new SuccessResponse('Permissions', {
            permissions
        }).send(res);
    }
);

export const GetPermission = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const permission = await findPermissionById(
            id as unknown as Types.ObjectId
        );
        new SuccessResponse('Permission', {
            permission
        }).send(res);
    }
);

export const GetAllPermission = asyncHandler(
    async (req: Request, res: Response) => {
        const permissions = await getAllPermissions();
        new SuccessResponse('Permissions', {
            permissions
        }).send(res);
    }
);

export const DeletePermissionByID = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.body;
        await deletePermissionByID(id);
        new SuccessResponse('Permission deleted successfully', {}).send(res);
    }
);
