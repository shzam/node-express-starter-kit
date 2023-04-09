import { Request, Response } from 'express';
import { Types } from 'mongoose';
import asyncHandler from '@helpers/asyncHandler';
import { SuccessResponse } from '@core/ApiResponse';

import { updateDemo, createDemo, deleteDemo, getAllDemo } from './model';

interface DemoRequest extends Request {
    body: {
        name: string;
    };
    params: {
        id?: string;
    };
}

export const GetDemo = asyncHandler(async (req: DemoRequest, res: Response) => {
    const demos = await getAllDemo();
    new SuccessResponse('Demo Api', demos).send(res);
});

export const CreateDemo = asyncHandler(
    async (req: DemoRequest, res: Response) => {
        const { name } = req.body;
        const demos = await createDemo({ name });
        new SuccessResponse('Demo Api', demos).send(res);
    }
);

export const UpdateDemo = asyncHandler(
    async (req: DemoRequest, res: Response) => {
        const { id } = req.params;
        const { name } = req.body;

        const demo = await updateDemo({
            _id: id! as unknown as Types.ObjectId,
            name: name
        });

        new SuccessResponse('Demo updated', demo).send(res);
    }
);

export const DeleteDemo = asyncHandler(
    async (req: DemoRequest, res: Response) => {
        const { id } = req.params;
        await deleteDemo(id! as unknown as Types.ObjectId);
        new SuccessResponse('Demo removed', {}).send(res);
    }
);
