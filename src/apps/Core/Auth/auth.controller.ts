import { Request, Response } from 'express';
import { ExtractJwt } from 'passport-jwt';
import asyncHandler from '@helpers/asyncHandler';
import { SuccessResponse } from '@core/ApiResponse';
//
import { createUser } from '@apps/Core/User/model/user.repository';
import { User } from '@apps/Core/User/model/user.model';

import {
    blackListToken,
    createJwtToken,
    findByToken,
    getTokenWithUserId,
    isTokenBlackListed,
    getTokenWithIpAddress,
    blackListTokens
} from './model/auth.repository';

export const Login = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as User;
    const ip = req.ip;
    const { deviceName } = req.body;

    const jwtTokens = await getTokenWithIpAddress(ip);
    await blackListTokens(jwtTokens.map((token) => token.accessKey));

    const generatedToken = user.generateJWT();
    await createJwtToken({
        accessKey: generatedToken.accessToken,
        client: user,
        ipAddress: ip,
        deviceName
    });

    const response = {
        ...generatedToken,
        user: {
            username: user.username,
            email: user.email,
            id: user._id,
            role: user.role?.roleName
        }
    };
    new SuccessResponse('Login Successfully', response).send(res);
});

export const Register = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password, role } = req.body;
    const user = await createUser(email, username, password, role);
    const response = {
        ...user.generateJWT(),
        user: {
            username: user.username,
            email: user.email,
            id: user._id,
            role: user.role?.roleName
        }
    };
    new SuccessResponse('Register Successfully', { response }).send(res);
});

export const Logout = asyncHandler(async (req: Request, res: Response) => {
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = jwtFromRequest(req);

    await blackListToken(token!);

    new SuccessResponse('Logout Successfully', {}).send(res);
});
