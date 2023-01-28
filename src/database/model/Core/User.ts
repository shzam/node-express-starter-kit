import { Schema, model } from 'mongoose';

import { BaseModel } from './Base';
import { Role, DOCUMENT_NAME as Role_DOCUMENT_NAME } from './Role';

export const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

export interface User extends BaseModel {
    email: string;
    username: string;
    password: string;
    role: Role;
}

const schema = new Schema<User>(
    {
        email: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            unique: true
        },
        username: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        password: {
            type: Schema.Types.String,
            select: false,
            required: true
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: Role_DOCUMENT_NAME
        }
    },
    { timestamps: true }
);

schema.index({ email: 1 });
schema.index({ username: 1 });

export const UserModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
