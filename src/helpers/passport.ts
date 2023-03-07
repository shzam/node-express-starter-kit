import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { User, UserModel } from '@database/model/core';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'TEMP'
};

const strategy = new Strategy(options, (payload, done) => {
    UserModel.findOne({ _id: payload.sub })
        .then((user: User | any) => {
            if (user) {
                return done(undefined, user);
            } else {
                return done(undefined, false);
            }
        })
        .catch((err) => done(err, undefined));
});
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});
passport.use(strategy);

export default passport;
