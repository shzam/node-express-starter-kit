import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '@app';
import { createUser } from '@apps/Core/User/model/user.repository';

afterAll(() => {
    mongoose.connection.db.dropCollection('users');
});
describe('Auth test', () => {
    const request = supertest(app);
    it('Register', async () => {
        const response = await request.post('/core/auth/register').send({
            email: 'test2@gmail.com',
            username: 'test2',
            password: 'test2password'
        });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.statusCode).toBe('10000');
        expect(response.body.data.accessToken).not.toBeNull();
    });
    describe('login', () => {
        beforeAll(async () => {
            const t = await createUser(
                'test@gmail.com',
                'test',
                'test1234',
                'user'
            );
        });

        it('Success login', async () => {
            const response = await request.post('/core/auth/login').send({
                email: 'test@gmail.com',
                password: 'test1234'
            });
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.statusCode).toBe('10000');
            expect(response.body.data.accessToken).not.toBeNull();
        });

        it('wrong user login', async () => {
            const response = await request.post('/core/auth/login').send({
                email: 'wrongtest@gmail.com',
                password: 'test1234'
            });
            console.log(response);
            // expect(response.status).toBe(StatusCodes.OK);
            // expect(response.body.statusCode).toBe('10000');
            // expect(response.body.data.accessToken).not.toBeNull();
        });
        afterAll(() => {
            mongoose.connection.close();
        });
    });
});
