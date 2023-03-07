import { Types } from 'mongoose';
import { InternalError } from '@core/ApiError';
import { findAllPermissionsById } from '@apps/Core/Permission/model/permission.repository';

import { Role, RoleModel } from './role.model';

const create = async (
    role: Role,
    permissionIds: Types.ObjectId[]
): Promise<Role> => {
    const permissions = await findAllPermissionsById(permissionIds);
    if (!permissions) {
        throw new InternalError('Permission not found');
    }
    role.permissions = permissions;
    const newRole = RoleModel.create(role);
    return newRole;
};

const findById = async (id: Types.ObjectId): Promise<Role | null> => {
    const role = await RoleModel.findOne({ _id: id }).lean().exec();
    return role;
};

const findAllById = async (ids: Types.ObjectId[]): Promise<Role[]> => {
    const roles = await RoleModel.find({ _id: { $in: ids } })
        .lean()
        .exec();
    return roles;
};

const updateById = async (
    role: Role,
    permissionIds: Types.ObjectId[]
): Promise<Role | null> => {
    const permissions = await findAllPermissionsById(permissionIds);

    if (!permissions) {
        throw new InternalError('Permission not found');
    }
    role.permissions = permissions;

    const updateRole = await RoleModel.findByIdAndUpdate(role._id, role, {
        new: true
    })
        .lean()
        .exec();
    if (!updateRole) {
        throw new InternalError('Role not found');
    }
    return updateRole;
};

const deleteById = async (id: Types.ObjectId): Promise<boolean> => {
    const result = await RoleModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
};

export { create, findById, updateById, deleteById, findAllById };
