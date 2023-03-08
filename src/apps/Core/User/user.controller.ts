import { Types } from 'mongoose';
import { Request, Response } from 'express';
import asyncHandler from '@helpers/asyncHandler';
import { SuccessResponse } from '@core/ApiResponse';
import bcrypt from 'bcrypt';

import {
    createUser,
    deleteUser,
    findUserByEmail,
    findUserById,
    updateUser,
    getAllUsers
} from './model/user.repository';

export const CreateUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    const user = await createUser(email, username, password);

    new SuccessResponse('user created successfully', {
        user
    }).send(res);
});

export const UpdateUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const user = await findUserByEmail(email);

    if (password) {
        user!.password = password;
    }

    user!.username = username;
    const newUser = await updateUser(user!);

    new SuccessResponse('user updated successfully', {
        newUser
    }).send(res);
});

export const GetUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await findUserById(id);

    new SuccessResponse('User', {
        user
    }).send(res);
});

export const GetUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await getAllUsers();
    new SuccessResponse('Users', {
        users
    }).send(res);
});

export const DeleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteUser(id as unknown as Types.ObjectId);

    new SuccessResponse('User deleted Successful', {}).send(res);
});
