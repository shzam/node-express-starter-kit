import { Types } from 'mongoose';
import { Request, Response } from 'express';
import asyncHandler from '@helpers/asyncHandler';
import { SuccessResponse } from '@core/ApiResponse';

import {
    createRole,
    deleteRoleById,
    updateRoleById,
    findRoleById,
    getAllRole
} from './model/role.repository';

export const CreateRole = asyncHandler(async (req: Request, res: Response) => {
    const { roleName, permissions } = req.body;

    const role = await createRole(roleName, permissions);

    new SuccessResponse('Role created successfully', role).send(res);
});

export const GetAllRoles = asyncHandler(async (req: Request, res: Response) => {
    const roles = await getAllRole();
    console.log(roles);
    new SuccessResponse('roles', roles).send(res);
});

export const GetRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const role = await findRoleById(id as unknown as Types.ObjectId);

    new SuccessResponse('role', role).send(res);
});

export const UpdateRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roleName, permissions } = req.body;

    const role = await updateRoleById(
        roleName,
        permissions,
        id as unknown as Types.ObjectId
    );

    new SuccessResponse('role updated successfully', role).send(res);
});

export const DeleteRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteRoleById(id as unknown as Types.ObjectId);
    new SuccessResponse('Role deleted successfully', {}).send(res);
});
