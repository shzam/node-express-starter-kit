import express from 'express';

//
import { TestRoute } from './Demo';

const router = express.Router();

router.use('/test', TestRoute);
export default router;
