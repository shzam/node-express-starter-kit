import { getRoleByName } from '@apps/Core/Role/model/role.repository';
import { User } from '@apps/Core/User/model/user.model';
import { createMultipleUsers } from '@apps/Core/User/model/user.repository';

const getUserData = async () => {
    const adminRole = await getRoleByName('admin');

    const user: Pick<User, 'email' | 'password' | 'username' | 'role'>[] = [
        {
            email: 'admin@gmail.com',
            username: 'admin',
            password: 'admin1234',
            role: adminRole
        }
    ];
    return user;
};

export const seed = async () => {
    const users = await getUserData();
    await createMultipleUsers(users);
};
