import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { BaseModel } from '../../Base/model/Base';
import {
    Role,
    DOCUMENT_NAME as Role_DOCUMENT_NAME
} from '../../Role/model/role.model';

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

// schema.methods.isValidPassword = async function (password: string) {
//     // const user = this;
//     // const compare = await bcrypt.compare(password, user.password);
//     // return compare;
// };
schema.index({ email: 1 });
schema.index({ username: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
