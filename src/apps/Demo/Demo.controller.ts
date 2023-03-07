import { Request, Response } from 'express';
import asyncHandler from '@helpers/asyncHandler';
import { SuccessResponse } from '@core/ApiResponse';

export const TestApi = asyncHandler(async (_req: Request, res: Response) => {
    new SuccessResponse('Demo Api', {
        message: 'hello world'
    }).send(res);
});
