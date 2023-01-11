import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';

import app from '../../../src/app';

describe('first test', () => {
    it('test', async () => {
        const request = supertest(app);
        const response = await request.get('/test');
        expect(response.status).toBe(StatusCodes.OK);
    });
});
