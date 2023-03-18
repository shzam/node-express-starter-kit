import { Schema, model } from 'mongoose';

import { BaseModel } from '../../Base/model/Base';
import {
    Permissions,
    DOCUMENT_NAME as PERMISSION_DOCUMENT_NAME
} from '../../Permission/model/permissions.model';

export const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'roles';

export interface Role extends BaseModel {
    roleName: string;
    permissions: Permissions[];
}

const schema = new Schema<Role>({
    roleName: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        unique: true
    },
    permissions: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: PERMISSION_DOCUMENT_NAME
            }
        ]
    }
});

schema.index({ RoleName: 1 });

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
