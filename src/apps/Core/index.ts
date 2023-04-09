import express from 'express';

//
import Permission from './Permission/permission.routes';
import User from './User/user.routes';
import Role from './Role/role.routes';
import Auth from './Auth/auth.routes';

const router = express.Router();

router.use('/permission', Permission);
router.use('/role', Role);
router.use('/user', User);
router.use('/auth', Auth);

export default router;
