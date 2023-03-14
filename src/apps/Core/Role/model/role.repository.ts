import { Types } from 'mongoose';
import { InternalError } from '@core/ApiError';
import { findAllPermissionsById } from '@apps/Core/Permission/model/permission.repository';

import { Role, RoleModel } from './role.model';

const createRole = async (
    roleName: string,
    permissionsIds: Types.ObjectId[]
): Promise<Role> => {
    const permissions = await findAllPermissionsById(permissionsIds);
    if (!permissions) {
        throw new InternalError('Permission not found');
    }
    const role = RoleModel.create({ roleName: roleName, permissions });
    return role;
};

const findRoleById = async (id: Types.ObjectId): Promise<Role | null> => {
    const role = await RoleModel.findOne({ _id: id }).lean().exec();
    return role;
};

const findAllRolesById = async (ids: Types.ObjectId[]): Promise<Role[]> => {
    const roles = await RoleModel.find({ _id: { $in: ids } })
        .lean()
        .exec();
    return roles;
};

const updateRoleById = async (
    roleName: string,
    permissionsIds: Types.ObjectId[],
    id: Types.ObjectId
): Promise<Role | null> => {
    const permissions = await findAllPermissionsById(permissionsIds);

    if (!permissions) {
        throw new InternalError('Permission not found');
    }
    const role = await findRoleById(id);
    if (!role) {
        throw new InternalError('Role not found');
    }

    role.permissions = permissions;
    const updateRole = await RoleModel.findByIdAndUpdate(role._id, role, {
        new: true
    })
        .lean()
        .exec();

    return updateRole;
};

const deleteRoleById = async (id: Types.ObjectId): Promise<boolean> => {
    const result = await RoleModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
};

export {
    createRole,
    findRoleById,
    updateRoleById,
    deleteRoleById,
    findAllRolesById
};
