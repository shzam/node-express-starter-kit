import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Demo';
export const COLLECTION_NAME = 'demos';

export interface Demo {
    _id: Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema<Demo>(
    {
        name: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            unique: true
        }
    },
    { timestamps: true }
);

export const DemoModel = model<Demo>(DOCUMENT_NAME, schema, COLLECTION_NAME);
