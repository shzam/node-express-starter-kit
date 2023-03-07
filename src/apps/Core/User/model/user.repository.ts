import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { NoDataError } from '@core/ApiError';
import { findById as findRoleById } from '@apps/Core/Role/model/role.repository';

import { User, UserModel } from './user.model';

const createUser = async (
    email: string,
    username: string,
    password: string
): Promise<User> => {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, password: passwordHash, email });
    const result = await user.save();
    return result;
};

const findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await UserModel.findOne({ email: email });
    if (user) return user;
    throw new NoDataError(`User with "${email}" not found`);
};
const findUserById = async (id: string): Promise<User | null> => {
    const user = await UserModel.findOne({ id: id });
    return user;
};

const getAllUsers = async (): Promise<User[]> => {
    const users = await UserModel.find({});
    return users;
};

const updateUser = async (user: User, roleId?: Types.ObjectId) => {
    if (roleId) {
        const role = await findRoleById(roleId);
        if (!role) {
            throw new NoDataError(`Role with "${roleId}" not found`);
        }
        user.role = role;
    }
    const newUser = await UserModel.findByIdAndUpdate(user._id, user, {
        new: true
    });
    return newUser;
};

const deleteUser = async (id: Types.ObjectId): Promise<boolean> => {
    const result = await UserModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
};

export {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser,
    getAllUsers
};
