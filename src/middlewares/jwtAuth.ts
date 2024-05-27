import passport from 'passport'
import { RequestHandler } from 'express'

const jwtAuth: RequestHandler = (req, res, next) =>
  passport.authenticate('jwt', { session: false })(req, res, next)

export default jwtAuth