import { Response, NextFunction, Request } from 'express';
import accessControl from 'accesscontrol';
import { ForbiddenError, InternalError } from '@core/ApiError';
import { getAllRole } from '@apps/Core/Role/model/role.repository';
import { User } from '@apps/Core/User/model/user.model';

interface GrantType {
    role: string;
    resource: string;
    action: string;
    attributes: string;
}

const getAccessControl = async (): Promise<GrantType[]> => {
    const roles = await getAllRole();
    const grantList: GrantType[] = [];
    roles.forEach((role) => {
        role.permissions.forEach((permission) => {
            const grant = {
                role: role.roleName,
                resource: permission.resource,
                action: `${permission.action}:any`,
                attributes: permission.attributes.join(' ,')
            };
            grantList.push(grant);
        });
    });
    return grantList;
};

export default (
        resource: string,
        action: 'create' | 'read' | 'update' | 'delete'
    ) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const ac = new accessControl.AccessControl();
        const grantList = await getAccessControl();
        ac.setGrants(grantList);
        console.log('hello');
        console.log(grantList);
        try {
            const user: Partial<User> = req.user!;
            const role = user.role?.roleName || 'user';
            switch (action) {
                case 'create':
                    if (ac.can(role).create(resource).granted) next();
                    else {
                        throw new ForbiddenError(
                            'Sorry you do not have permission to create this resource'
                        );
                    }
                    break;
                case 'read':
                    if (ac.can(role).read(resource).granted) next();
                    else {
                        throw new ForbiddenError(
                            'Sorry you do not have permission to read this resource'
                        );
                    }
                    break;
                case 'update':
                    if (ac.can(role).update(resource).granted) next();
                    else {
                        throw new ForbiddenError(
                            'Sorry you do not have permission to update this resource'
                        );
                    }
                    break;
                case 'delete':
                    if (ac.can(role).delete(resource).granted) next();
                    else {
                        throw new ForbiddenError(
                            'Sorry you do not have permission to delete this resource'
                        );
                    }
                    break;
                default:
                    throw new InternalError('Sorry, invalid action type');
            }
        } catch (error) {
            next(error);
        }
    };
