import { Schema, model } from 'mongoose';
import { BaseModel } from '@apps/Core/Base/model/Base';

export const DOCUMENT_NAME = 'Permission';
export const COLLECTION_NAME = 'permissions';

export interface Permissions extends BaseModel {
    resource: string;
    attributes: string[];
    action: 'create' | 'read' | 'delete' | 'update';
}

const schema = new Schema<Permissions>(
    {
        resource: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        attributes: [
            {
                type: Schema.Types.String,
                required: true,
                trim: true,
                default: '*',
                unique: true
            }
        ],
        action: {
            type: Schema.Types.String,
            enum: ['create', 'read', 'delete', 'update'],
            required: true
        }
    },
    { timestamps: true }
);

schema.index({ resource: 1, attributes: 1, action: 1 }, { unique: true });

export const PermissionsModel = model<Permissions>(
    DOCUMENT_NAME,
    schema,
    COLLECTION_NAME
);
