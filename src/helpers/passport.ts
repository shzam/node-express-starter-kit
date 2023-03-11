import passport from 'passport';
import {
    Strategy as JWTStrategy,
    ExtractJwt,
    StrategyOptions
} from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
//
import {
    findUserById,
    findUserByEmail
} from '@apps/Core/User/model/user.repository';
import { SECRET_KEY } from '@config';

const JWToptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
};

const strategy = new JWTStrategy(JWToptions, async (payload, done) => {
    const user = await findUserById(payload.sub);

    if (user) {
        return done(undefined, { ...user, accessToken: payload.token });
    } else {
        return done(undefined, false);
    }
});

passport.use(
    'local',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            const user = await findUserByEmail(email);
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }

            const isCorrect = user!.validatePassword(password);
            if (!isCorrect) {
                return done(null, false, { message: 'Incorrect password.' });
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
