import supertest from 'supertest';

import app from '../../../src/app';

describe('first test', () => {
    const request = supertest(app);
    request.get('/');
});
