import { Response, NextFunction, Request } from 'express';
import accessControl from 'accesscontrol';
import { ForbiddenError } from '@core/ApiError';
import { getAllRole } from '@apps/Core/Role/model/role.repository';

const getAccessControl = async () => {
    const roles = await getAllRole();
};

export default (
        resource: string,
        action: 'create' | 'read' | 'update' | 'delete'
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            // const
            // if (!req.apiKey?.permissions)
            //     return next(new ForbiddenError('Permission Denied'));

            // const exists = req.apiKey.permissions.find(
            //     (entry) => entry === permission
            // );
            // if (!exists) return next(new ForbiddenError('Permission Denied'));

            next();
        } catch (error) {
            next(error);
        }
    };
