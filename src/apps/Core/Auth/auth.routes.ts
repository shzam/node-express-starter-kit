import express from 'express';
import validator, { ValidationSource } from '@helpers/validator';
import passport from 'passport';
import { ProtectedRoutes } from '@helpers/auth';

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

router.get('/logout', ProtectedRoutes, Logout);

export default router;
