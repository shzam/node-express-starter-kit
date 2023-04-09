import { Types } from 'mongoose';
import { BadRequestError, NoDataError } from '@core/ApiError';
import { findAllPermissionsById } from '@apps/Core/Permission/model/permission.repository';

import { Role, RoleModel } from './role.model';

const createMultipleRole = async (
    roles: Pick<Role, 'permissions' | 'roleName'>[]
) => {
    const bulkOps = roles.map((doc) => ({
        updateOne: {
            filter: { roleName: doc.roleName },
            update: { $set: doc },
            upsert: true
        }
    }));

    const role = await RoleModel.bulkWrite(bulkOps);
    return role;
};

const createRole = async (
    roleName: string,
    permissionsIds: Types.ObjectId[]
): Promise<Role> => {
    const permissions = await findAllPermissionsById(permissionsIds);
    if (!permissions) {
        throw new NoDataError('Permission not found');
    }
    try {
        const role = await RoleModel.create({
            roleName: roleName,
            permissions
        });
        return role;
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

const findRoleById = async (id: Types.ObjectId): Promise<Role | null> => {
    const role = await RoleModel.findOne({ _id: id }).lean().exec();
    return role;
};

const getAllRole = async (): Promise<Role[]> => {
    const roles = await RoleModel.find({}).populate('permissions');
    return roles;
};

const findAllRolesById = async (ids: Types.ObjectId[]): Promise<Role[]> => {
    const roles = await RoleModel.find({ _id: { $in: ids } })
        .lean()
        .exec();
    return roles;
};

const getRoleByName = async (roleName: string) => {
    const role = await RoleModel.findOne({ roleName: roleName });
    if (role) return role;
    throw new NoDataError(`no role found with '${roleName}' name`);
};

const updateRoleById = async (
    roleName: string,
    permissionsIds: Types.ObjectId[],
    id: Types.ObjectId
): Promise<Role | null> => {
    const permissions = await findAllPermissionsById(permissionsIds);

    if (!permissions) {
        throw new NoDataError('Permission not found');
    }
    const role = await findRoleById(id);

    if (role === null) {
        throw new NoDataError('Role not found');
    }
    role.roleName = roleName;
    role.permissions = permissions;

    try {
        const updateRole = await RoleModel.findByIdAndUpdate(id, role, {
            new: true
        })
            .lean()
            .exec();

        return updateRole;
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
                throw error;
        }
    }
};

const deleteRoleById = async (id: Types.ObjectId): Promise<boolean> => {
    const result = await RoleModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
};

export {
    createRole,
    findRoleById,
    createMultipleRole,
    updateRoleById,
    deleteRoleById,
    findAllRolesById,
    getAllRole,
    getRoleByName
};
