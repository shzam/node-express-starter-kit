import express from 'express';

//
import Test from "./test/test.router"

const router = express.Router();

router.use('/test',Test)
export default router