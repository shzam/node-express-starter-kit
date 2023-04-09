import { Schema, model, Types } from 'mongoose';
import { User } from '@apps/Core/User/model/user.model';

//
import { BaseModel } from '../../Base/model/Base';

export const DOCUMENT_NAME = 'JWTtoken';
export const COLLECTION_NAME = 'JWTtokens';

export interface JWTtoken extends BaseModel {
    client: Omit<User, 'password'>;
    accessKey: string;
    ipAddress: string;
    blacklisted?: boolean;
    deviceName?: string;
}

const schema = new Schema<JWTtoken>(
    {
        ipAddress: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        client: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        accessKey: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        blacklisted: {
            type: Schema.Types.Boolean,
            default: false
        }
    },
    {
        versionKey: false
    }
);

schema.index({ client: 1 });
schema.index({ client: 1, primaryKey: 1, status: 1 });
schema.index({ client: 1, primaryKey: 1, secondaryKey: 1 });

export const JwtTokenModel = model<JWTtoken>(
    DOCUMENT_NAME,
    schema,
    COLLECTION_NAME
);
