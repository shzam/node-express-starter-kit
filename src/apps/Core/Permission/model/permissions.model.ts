import { Schema, model } from 'mongoose';
import { BaseModel } from '@apps/Core/Base/model/Base';

export const DOCUMENT_NAME = 'Permission';
const COLLECTION_NAME = 'permissions';

export interface PermissionsActions {
    attributes: string;
    action: string;
}

export interface Permissions extends BaseModel {
    resource: string;
    actions: PermissionsActions[];
}

const schema = new Schema<Permissions>(
    {
        resource: {
            type: Schema.Types.String,
            required: true
        },
        actions: [
            { type: Array, required: true },
            {
                attributes: {
                    type: Schema.Types.String,
                    required: true,
                    trim: true
                },
                action: {
                    type: Schema.Types.String,
                    enum: ['create', 'read', 'view', 'update'],
                    required: true,
                    trim: true
                }
            }
        ]
    },
    { timestamps: true }
);

schema.index({ resource: 1 });

export const PermissionsModel = model<Permissions>(
    DOCUMENT_NAME,
    schema,
    COLLECTION_NAME
);
