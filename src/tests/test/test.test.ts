import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '@app';

describe('Demo test', () => {
    const request = supertest(app);
    it('Success test', async () => {
        const response = await request.get('/core/permission');
        expect(response.status).toBe(StatusCodes.OK);
    });
    it('Route Not Found test', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    afterAll(() => {
        mongoose.connection.close();
    });
});
