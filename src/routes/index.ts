import express from 'express';
//
import {TestRoute} from "./test"

const router = express.Router();

router.use('/test',TestRoute)
export default router