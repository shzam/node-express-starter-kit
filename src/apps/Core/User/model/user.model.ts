import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
//

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
    role?: Role;
    validatePassword(password: string): boolean;
    generateJWT(): { accessToken: string };
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
schema.methods.validatePassword = async function (password: string) {
    const hash = await bcrypt.compare(password, this.password);
    return hash;
};

schema.methods.generateJWT = function () {
    const secret = SECRET_KEY;
    return {
        accessToken: jwt.sign(
            {
                email: this.email,
                id: this._id
            },
            secret,
            { expiresIn: '1h' }
        )
    };
};

schema.index({ email: 1 });
schema.index({ username: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
