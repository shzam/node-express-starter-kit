import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import asyncHandler from '@helpers/asyncHandler';
import { SuccessResponse } from '@core/ApiResponse';
// import { User } from '@database/repository/core';

export const RegisterUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, username, password } = req.body;
    }
);

export const Login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // const user = await User.findByEmail(email);
    // const passwordsMatch = await bcrypt.compare(password, user!.password);

    // if (passwordsMatch) {
    //     const payload = {
    //         sub: user?._id
    //     };
    // }

    new SuccessResponse('Demo Api', {
        message: 'hello world'
    }).send(res);
});
