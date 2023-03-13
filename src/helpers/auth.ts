import passport from 'passport';

export const ProtectedRoutes = passport.authenticate('jwt', { session: false });
