import express from 'express';
import permission from 'helper/permission';

//
import Test from "./test/test.router"

const router = express.Router();

router.use('/test',Test)
export default router