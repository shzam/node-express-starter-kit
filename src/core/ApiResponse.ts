import { Response } from 'express';
import { StatusCodes as ResponseStatus } from 'http-status-codes';

enum StatusCode {
    SUCCESS = '10000',
    FAILURE = '10001',
    RETRY = '10002',
    INVALID_ACCESS_TOKEN = '10003'
}

abstract class ApiResponse {
    constructor(
        protected statusCode: StatusCode,
        protected message: string,
        protected status?: ResponseStatus
    ) {}

    protected prepare<T extends ApiResponse>(
        res: Response,
        response: T,
        headers: { [key: string]: string }
    ): Response {
        for (const [key, value] of Object.entries(headers))
            res.append(key, value);

        return res
            .status(this.status as number)
            .json(ApiResponse.sanitize(response));
    }

    public send(
        res: Response,
        headers: { [key: string]: string } = {}
    ): Response {
        return this.prepare<ApiResponse>(res, this, headers);
    }
    private static sanitize<T extends ApiResponse>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);

        delete clone.status;
        for (const i in clone)
            if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }
}

export class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Authentication Failure') {
        super(StatusCode.FAILURE, message, ResponseStatus.UNAUTHORIZED);
    }
}

export class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not Found') {
        super(StatusCode.FAILURE, message, ResponseStatus.NOT_FOUND);
    }

    send(res: Response, headers: { [key: string]: string } = {}): Response {
        return super.prepare<NotFoundResponse>(res, this, headers);
    }
}

export class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
        super(StatusCode.FAILURE, message, ResponseStatus.FORBIDDEN);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Parameters') {
        super(StatusCode.FAILURE, message, ResponseStatus.BAD_REQUEST);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(
            StatusCode.FAILURE,
            message,
            ResponseStatus.INTERNAL_SERVER_ERROR
        );
    }
}

export class SuccessMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(StatusCode.SUCCESS, message, ResponseStatus.OK);
    }
}

export class FailureMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(StatusCode.FAILURE, message, ResponseStatus.OK);
    }
}
export class SuccessResponse<T> extends ApiResponse {
    constructor(message: string, private data: T) {
        super(StatusCode.SUCCESS, message, ResponseStatus.OK);
    }

    send(res: Response, headers: { [key: string]: string } = {}): Response {
        return super.prepare<SuccessResponse<T>>(res, this, headers);
    }
}

export class AccessTokenErrorResponse extends ApiResponse {
    private instruction = 'refresh_token';

    constructor(message = 'Access token invalid') {
        super(
            StatusCode.INVALID_ACCESS_TOKEN,
            message,
            ResponseStatus.UNAUTHORIZED
        );
    }
    send(res: Response, headers: { [key: string]: string } = {}): Response {
        headers.instruction = this.instruction;
        return super.prepare<AccessTokenErrorResponse>(res, this, headers);
    }
}

export class TokenRefreshResponse extends ApiResponse {
    constructor(
        message: string,
        private accessToken: string,
        private refreshToken: string
    ) {
        super(StatusCode.SUCCESS, message, ResponseStatus.OK);
    }

    send(res: Response, headers: { [key: string]: string } = {}): Response {
        return super.prepare<TokenRefreshResponse>(res, this, headers);
    }
}
