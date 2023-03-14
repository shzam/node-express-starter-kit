import express from 'express';

//
import Core from './Core';

const router = express.Router();

router.use('/core', Core);

export default router;
