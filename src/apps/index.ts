import express from 'express';

//
import Permission from './Core/Permission/permission.routes';
import User from './Core/User/user.routes';

const router = express.Router();

router.use('/core/permission', Permission);
router.use('/core/user', User);

export default router;
