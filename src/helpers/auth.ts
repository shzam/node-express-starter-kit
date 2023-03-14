import passport from 'passport';

export const ProtectRoutes = passport.authenticate('jwt', { session: false });
