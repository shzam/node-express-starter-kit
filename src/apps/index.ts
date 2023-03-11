import express from 'express';

//
import Permission from './Core/Permission/permission.routes';
import User from './Core/User/user.routes';
import Auth from './Core/Auth/auth.routes';

const router = express.Router();

router.use('/core/permission', Permission);
router.use('/core/user', User);
router.use('/core/auth', Auth);

export default router;
