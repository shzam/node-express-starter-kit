import express from 'express';

//
import Permission from './Core/Permission/permission.routes';

const router = express.Router();

router.use('/core/permission', Permission);

export default router;
