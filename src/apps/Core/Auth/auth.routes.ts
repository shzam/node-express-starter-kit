import express from 'express';
import validator from '@helpers/validator';
import passport from 'passport';
import { ProtectRoutes } from '@helpers/auth';

import { Login, Logout, Register } from './auth.controller';
import schema from './auth.schema';

const router = express.Router();

router.post(
    '/login',
    validator(schema.loginUserSchema),
    passport.authenticate('local'),
    Login
);

router.post('/register', validator(schema.registerUserSchema), Register);

router.get('/logout', ProtectRoutes, Logout);

export default router;
