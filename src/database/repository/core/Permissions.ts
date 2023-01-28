import { Types } from 'mongoose';
import { Permissions, PermissionsModel } from '@database/model/core';

const create = async (permission: Permissions): Promise<Permissions> => {
    const newPermission = await PermissionsModel.create(permission);
    return newPermission;
};

const update = async (permission: Permissions): Promise<Permissions | null> => {
    const updatedPermissions = await PermissionsModel.findByIdAndUpdate(
        permission._id,
        permission,
        { new: true }
    )
        .lean()
        .exec();
    return updatedPermissions;
};

const findById = async (id: Types.ObjectId): Promise<Permissions | null> => {
    const permission = await PermissionsModel.findOne({ _id: id })
        .lean()
        .exec();
    return permission;
};

const findAllById = async (ids: Types.ObjectId[]): Promise<Permissions[]> => {
    const permissions = await PermissionsModel.find({ _id: { $in: ids } })
        .lean()
        .exec();
    return permissions;
};
const findAll = async (
    pageNumber: number,
    limit: number
): Promise<Permissions[]> => {
    const permissions = await PermissionsModel.find({})
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .lean()
        .exec();
    return permissions;
};

const deleteByID = async (ids: Types.ObjectId[]): Promise<boolean> => {
    const result = await PermissionsModel.deleteMany({ _id: { $in: ids } });
    return result.deletedCount > 0;
};

export { create, update, findById, findAll, deleteByID, findAllById };
