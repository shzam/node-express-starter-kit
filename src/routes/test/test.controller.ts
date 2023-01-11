import { Response } from 'express';

import asyncHandler from '../../helpers/asyncHandler';
import { PublicRequest } from '../../types/app-request';
import { SuccessResponse } from '../../core/ApiResponse';

export const TestApi = asyncHandler(
    async (_req: PublicRequest, res: Response) => {
        new SuccessResponse('Test Api', {
            message: 'hello world works think'
        }).send(res);
    }
);
