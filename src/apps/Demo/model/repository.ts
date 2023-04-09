import { Types } from 'mongoose';
import { NoDataError, BadRequestError } from '@core/ApiError';

import { Demo, DemoModel } from './model';

const createDemo = async ({ name }: Pick<Demo, 'name'>): Promise<Demo> => {
    try {
        const demo = await DemoModel.create({ name });
        return demo;
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

const updateDemo = async (demo: Pick<Demo, '_id' | 'name'>): Promise<Demo> => {
    try {
        const newDemo = await DemoModel.findByIdAndUpdate(
            demo._id,
            {
                name: demo.name
            },
            { new: true }
        )
            .lean()
            .exec();

        if (!newDemo) {
            throw new NoDataError(`No Demo with id ${demo._id} found`);
        }
        return newDemo;
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

const deleteDemo = async (id: Types.ObjectId) => {
    const result = await DemoModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
        throw new NoDataError(`No demo with id ${id} found`);
    }
};

const getAllDemo = async () => {
    const demo = await DemoModel.find();
    return demo;
};

export { createDemo, updateDemo, deleteDemo, getAllDemo };
