import express from 'express';

//
import { DemoRoute } from './Demo';

const router = express.Router();

router.use('/demo', DemoRoute);

export default router;
