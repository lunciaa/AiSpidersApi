import passport from 'passport'
import jwtStrategy from './passport-jwt'
import localStrategy from './passport-local'

export default () => {
  passport.use(localStrategy)
  passport.use(jwtStrategy)
}