import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '@app';
import { COLLECTION_NAME, createDemo } from '@apps/Demo/model';

describe('Demo test', () => {
    const request = supertest(app);

    afterAll(async () => {
        await mongoose.connection.db.dropCollection(COLLECTION_NAME);
        await mongoose.connection.close();
    });

    describe('fetching demo test', () => {
        beforeAll(async () => {
            await createDemo({ name: 'test' });
            await createDemo({ name: 'test2' });
        });
        it('should able to get all data', async () => {
            const response = await request.get('/demo');

            const { data } = response.body;
            expect(response.status).toBe(StatusCodes.OK);
            expect(data).not.toBeNull();
            expect(data.length).toBe(2);
        });
    });
    describe('Creating demo ', () => {
        it('should successfully create demo', async () => {
            const name = 'test3';
            const response = await request.post('/demo').send({
                name: name
            });
            const { data } = response.body;

            expect(response.status).toBe(StatusCodes.OK);
            expect(data.name).toBe(name);
        });
        it('should return error if there is no name passed', async () => {
            const response = await request.post('/demo');

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.message).toBe('name is required');
        });
        it('duplicate name should not be allowed', async () => {
            const name = 'test3';
            const response = await request.post('/demo').send({
                name: name
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });
    });
    describe('Updating Demo', () => {
        it('should successfully update existing data', async () => {
            const demo = await createDemo({ name: 'testPut' });
            const response = await request
                .put(`/demo/${demo._id}`)
                .send({ name: 'newTest' });
            const { data } = response.body;
            expect(response.status).toBe(StatusCodes.OK);

            expect(data.name).toBe('newTest');
        });
        it('should validate the params as valid id ', async () => {
            const response = await request
                .put(`/demo/wrongId`)
                .send({ name: 'newTest' });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.message).toBe('id contains an invalid value');
        });
        it('should validate the body contains valid data ', async () => {
            const demo = await createDemo({ name: 'testPut2' });
            const response = await request.put(`/demo/${demo._id}`);

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.message).toBe('name is required');
        });
    });

    describe('Deleting Demo', () => {
        it('should successfully delete a demo', async () => {
            const demo = await createDemo({ name: 'deleteTest' });

            const response = await request.delete(`/demo/${demo._id}`);
            expect(response.status).toBe(StatusCodes.OK);
        });
        it('should only delete an exiting data', async () => {
            const demo = await createDemo({ name: 'deleteTest' });
            await request.delete(`/demo/${demo._id}`);

            const response = await request.delete(`/demo/${demo._id}`);

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.message).toBe(
                `No demo with id ${demo._id} found`
            );
        });
    });
});
