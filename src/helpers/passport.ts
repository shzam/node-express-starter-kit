import passport from 'passport';
import {
    Strategy as JWTStrategy,
    ExtractJwt,
    StrategyOptions,
    VerifiedCallback
} from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
//
import {
    findUserById,
    findUserByEmail
} from '@apps/Core/User/model/user.repository';
import { findByToken } from '@apps/Core/Auth/model/auth.repository';
import { SECRET_KEY } from '@config';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { NoDataError } from '@core/ApiError';

const JWToptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
    passReqToCallback: true
};

const strategy = new JWTStrategy(
    JWToptions,
    async (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
        const user = await findUserById(payload.sub!);
        if (user) {
            const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
            const jwtToken = await findByToken(token!);

            if (jwtToken.blacklisted === false && jwtToken.ipAddress === req.ip)
                return done(undefined, { ...user });
        }
        return done(undefined, false);
    }
);

passport.use(
    'local',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password', session: false },
        async (email, password, done) => {
            const user = await findUserByEmail(email);
            if (!user) {
                return done(new NoDataError('No user name found'), false);
            }

            const isCorrect = user!.validatePassword(password);
            if (!isCorrect) {
                return done(null, false);
            }

            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});
passport.use(strategy);

export default passport;
