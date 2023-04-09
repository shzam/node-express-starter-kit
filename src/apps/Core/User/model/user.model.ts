import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
//

import { BaseModel } from '../../Base/model/Base';
import {
    Role,
    DOCUMENT_NAME as RoleDocumentName
} from '../../Role/model/role.model';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

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
            ref: RoleDocumentName
        }
    },
    { timestamps: true }
);
schema.methods.validatePassword = async function (password: string) {
    const user = await UserModel.findById(this._id).select('+password');
    const hash = await bcrypt.compare(password, user!.password);
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
            { expiresIn: '1d' }
        )
    };
};

schema.index({ email: 1 });
schema.index({ username: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
