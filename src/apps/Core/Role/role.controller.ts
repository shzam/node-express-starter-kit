import { Types } from 'mongoose';
import { Request, Response } from 'express';
import asyncHandler from '@helpers/asyncHandler';
import { SuccessResponse } from '@core/ApiResponse';

import {
    createRole,
    deleteRoleById,
    updateRoleById,
    findAllRolesById,
    findRoleById
} from './model/role.repository';

export const CreateRole = asyncHandler(async (req: Request, res: Response) => {
    const { roleName, permissions } = req.body;

    const role = await createRole(roleName, permissions);

    new SuccessResponse('Role created successfully', role).send(res);
});

export const GetAllRoles = asyncHandler(async (req: Request, res: Response) => {
    const role = await findAllRolesById([]);
    new SuccessResponse('role', role).send(res);
});

export const GetRole = asyncHandler(async (req: Request, res: Response) => {
    const { roleId } = req.params;

    const role = await findRoleById(roleId as unknown as Types.ObjectId);

    new SuccessResponse('role', role).send(res);
});

export const UpdateRole = asyncHandler(async (req: Request, res: Response) => {
    const { roleId } = req.params;
    const { roleName, permissions } = req.body;

    const role = await updateRoleById(
        roleName,
        permissions,
        roleId as unknown as Types.ObjectId
    );

    new SuccessResponse('role updated successfully', role).send(res);
});

export const DeleteRole = asyncHandler(async (req: Request, res: Response) => {
    const { roleId } = req.params;
    await deleteRoleById(roleId as unknown as Types.ObjectId);
    new SuccessResponse('Role deleted successfully', {}).send(res);
});
