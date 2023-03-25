import { createMultiplePermissions } from '@apps/Core/Permission/model/permission.repository';
import { Permissions } from '@apps/Core/Permission/model/permissions.model';

const permissions: Pick<Permissions, 'action' | 'attributes' | 'resource'>[] = [
    // permissions
    { resource: 'permissions', action: 'create', attributes: ['*'] },
    { resource: 'permissions', action: 'read', attributes: ['*'] },
    { resource: 'permissions', action: 'update', attributes: ['*'] },
    { resource: 'permissions', action: 'delete', attributes: ['*'] },
    // roles
    { resource: 'roles', action: 'create', attributes: ['*'] },
    { resource: 'roles', action: 'read', attributes: ['*'] },
    { resource: 'roles', action: 'update', attributes: ['*'] },
    { resource: 'roles', action: 'delete', attributes: ['*'] },
    // user
    { resource: 'users', action: 'create', attributes: ['*'] },
    { resource: 'users', action: 'read', attributes: ['*'] },
    { resource: 'users', action: 'update', attributes: ['*'] },
    { resource: 'users', action: 'delete', attributes: ['*'] }
];

export const seed = async () => {
    await createMultiplePermissions(permissions);
    console.log('Role seeded successfully');
};
