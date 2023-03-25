import { BadRequestError, NoDataError } from '@core/ApiError';
import mongoose, { Types } from 'mongoose';

import { Permissions, PermissionsModel } from './permissions.model';

const createMultiplePermissions = async (
    permission: Pick<Permissions, 'action' | 'resource' | 'attributes'>[]
) => {
    const isExists = await mongoose.connection.db
        .listCollections({
            name: { $in: permission.map((x) => x.resource) }
        })
        .toArray();
    if (isExists.length !== permission.length) {
        throw new BadRequestError(
            `can not create permissions, with model that does not exist`
        );
    }
    const bulkOps = permission.map((doc) => ({
        updateOne: {
            filter: { resource: doc.resource },
            update: { $set: doc },
            upsert: true
        }
    }));

    const permissions = await PermissionsModel.bulkWrite(bulkOps);
    return permissions;
};

const createPermissions = async (
    permission: Pick<Permissions, 'action' | 'resource' | 'attributes'>
): Promise<Permissions> => {
    try {
        const isExists = await mongoose.connection.db
            .listCollections({
                name: permission.resource
            })
            .toArray();
        if (isExists.length === 0) {
            throw new BadRequestError(
                `there is no database table with name ${permission.resource}`
            );
        }
        const newPermission = await PermissionsModel.create(permission);
        return newPermission;
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

const updatedPermissions = async ({
    action,
    resource,
    attributes,
    _id
}: Pick<
    Permissions,
    'action' | 'resource' | '_id' | 'attributes'
>): Promise<Permissions | null> => {
    try {
        const isExists = await mongoose.connection.db
            .listCollections({
                name: resource
            })
            .toArray();
        if (isExists.length === 0) {
            throw new BadRequestError(
                `there is no database table with name ${resource}`
            );
        }
        const updatedPermissions = await PermissionsModel.findByIdAndUpdate(
            _id,
            { action, resource, attributes: attributes || '*' },
            { new: true }
        )
            .lean()
            .exec();
        return updatedPermissions;
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

const findPermissionById = async (
    id: Types.ObjectId
): Promise<Permissions | null> => {
    const permission = await PermissionsModel.findOne({ _id: id })
        .lean()
        .exec();
    if (!permission) throw new NoDataError('no permission found');
    return permission;
};

const findAllPermissionsById = async (
    ids: Types.ObjectId[]
): Promise<Permissions[]> => {
    const permissions = await PermissionsModel.find({ _id: { $in: ids } })
        .lean()
        .exec();
    return permissions;
};
const getAllPermissions = async (): Promise<Permissions[]> => {
    const permissions = await PermissionsModel.find();
    return permissions;
};

const deletePermissionByID = async (ids: Types.ObjectId[]): Promise<void> => {
    const result = await PermissionsModel.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
        throw new NoDataError(`No permission with id ${ids}`);
    }
};

export {
    createPermissions,
    updatedPermissions,
    findPermissionById,
    findAllPermissionsById,
    deletePermissionByID,
    getAllPermissions,
    createMultiplePermissions
};
