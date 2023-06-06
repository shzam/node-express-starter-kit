import { Types } from 'mongoose';
import { NoDataError, BadRequestError } from '@core/ApiError';

import { Demo, DemoModel } from './model';
import withErrorHandling from '@helpers/withErrorHandling';

const createDemo = async ({ name }: Pick<Demo, 'name'>): Promise<Demo> => {
    return  withErrorHandling( async ()=>{
        const demo = await DemoModel.create({ name });
        return demo;
    })
};

const updateDemo = async (demo: Pick<Demo, '_id' | 'name'>): Promise<Demo> => {
    return  withErrorHandling( async ()=>{
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
    })
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
