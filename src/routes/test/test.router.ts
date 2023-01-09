import express from 'express';

import { TestApi} from './test.controller'

const router = express.Router();

router.get('/',TestApi)

export default router;
