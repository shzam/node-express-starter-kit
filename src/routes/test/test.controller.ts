import express from 'express';
import asyncHandler from 'helpers/asyncHandler';
import { ProtectedRequest, PublicRequest } from 'types/app-request';
import { SuccessResponse } from 'core/ApiResponse';


export const TestApi = asyncHandler(async (req: PublicRequest, res)=>{
    new SuccessResponse('Test Api',{
        message:'hello world'
    }).send(res)
})