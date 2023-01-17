import express from 'express';

import { TestApi } from './Demo.controller';

const router = express.Router();

router.get('/', TestApi);

export default router;
