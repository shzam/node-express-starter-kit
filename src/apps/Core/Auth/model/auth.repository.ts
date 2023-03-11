import { BadRequestError, NoDataError } from '@core/ApiError';
import { Types } from 'mongoose';

import { JwtTokenModel, JWTtoken } from './auth.model';

export const createJwtToken = async (
    jwtToken: Pick<
        JWTtoken,
        'accessKey' | 'client' | 'deviceName' | 'ipAddress'
    >
): Promise<boolean> => {
    await JwtTokenModel.create(jwtToken);
    return true;
};

export const findByToken = async (token: string): Promise<JWTtoken> => {
    const jwtToken = await JwtTokenModel.findOne({ accessKey: token });
    if (jwtToken) return jwtToken;
    throw new NoDataError(`No token found for ${token}`);
};

export const isTokenBlackListed = async (token: string): Promise<boolean> => {
    const jwtToken = await findByToken(token);
    return jwtToken.blacklisted!;
};

export const blackListToken = async (token: string): Promise<void> => {
    const jwtToken = await JwtTokenModel.findOneAndUpdate(
        { accessKey: token },
        { $set: { blackList: true } }
    );

    if (!jwtToken) throw new NoDataError(`No token found for ${token}`);
};

export const blackListTokens = async (token: string[]) => {
    await JwtTokenModel.updateMany({ accessKey: token }, { blackList: true });
};

export const getTokenWithUserId = async (
    id: Types.ObjectId
): Promise<JWTtoken[]> => {
    const jwtTokens = await JwtTokenModel.find({ client: id }).lean();
    return jwtTokens;
};

export const getTokenWithIpAddress = async (
    ip: string
): Promise<JWTtoken[]> => {
    const jwtTokens = await JwtTokenModel.find({
        ipAddress: ip,
        blacklisted: false
    }).lean();
    return jwtTokens;
};
