import { Response } from 'express';
import {environment} from 'config'
import {
    AuthFailureResponse,
    AccessTokenErrorResponse,
    InternalErrorResponse,
    NotFoundResponse,
    BadRequestResponse,
    ForbiddenResponse,
} from 'core/ApiResponse'