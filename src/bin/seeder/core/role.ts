import { Types } from 'mongoose';
import { Role } from '@apps/Core/Role/model/role.model';
import { createMultipleRole } from '@apps/Core/Role/model/role.repository';
import { getAllPermissions } from '@apps/Core/Permission/model/permission.repository';

const getRoleData = async () => {
    const permissions = await getAllPermissions();
    const roles: Pick<Role, 'permissions' | 'roleName'>[] = [
        {
            roleName: 'admin',
            permissions: permissions
        },
        {
            roleName: 'user',
            permissions: []
        }
    ];
    return roles;
};

export const seed = async () => {
    const roles = await getRoleData();
    createMultipleRole(roles);

    console.log('Role seeded successfully');
};
