import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { BadRequestError, NoDataError } from '@core/ApiError';
import { findRoleById } from '@apps/Core/Role/model/role.repository';
import { errorHandler } from '@apps/Core/Base/model/Base.repository';

import { User, UserModel } from './user.model';

const createUser = async (
    email: string,
    username: string,
    password: string
): Promise<User> => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            username,
            password: passwordHash,
            email
        });

        return user;
    } catch (error: { code: number; keyPattern: any; keyValue: any } | any) {
        const keys = Object.keys(error.keyPattern);
        const errorMessage: string[] = [];
        switch (error.code) {
            case 11000:
                keys.forEach((key) => {
                    const message = ` "${key}" with "${error.keyValue[key]}" already exist`;
                    errorMessage.push(message);
                });
                throw new BadRequestError(`${errorMessage}`);
            default:
                throw new BadRequestError('Unknown error ');
        }
    }
};

const findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await UserModel.findOne({ email: email });
    if (user) return user;
    throw new NoDataError(`User with "${email}" not found`);
};
const findUserById = async (id: string): Promise<User | null> => {
    const user = await UserModel.findOne({ id: id });
    if (user) return user;
    throw new NoDataError(`User with "${id}" not found`);
};

const getAllUsers = async (): Promise<User[]> => {
    const users = await UserModel.find({});
    return users;
};

const updateUser = async (user: User, roleId?: Types.ObjectId) => {
    return errorHandler(async () => {
        if (roleId) {
            const role = await findRoleById(roleId);
            if (!role) {
                throw new NoDataError(`Role with "${roleId}" not found`);
            }
            user.role = role;
        }
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        const newUser = await UserModel.findByIdAndUpdate(user._id, user, {
            new: true
        })
            .select('+password')
            .lean();
        if (newUser) return newUser;
        throw new NoDataError(`User with "${user._id}" not found`);
    });
};

const deleteUser = async (id: Types.ObjectId): Promise<void> => {
    const result = await UserModel.deleteOne({ _id: id });

    if (result.deletedCount > 0) return;
    throw new NoDataError(`User with "${id}" not found`);
};

export {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser,
    getAllUsers
};
