import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '@models/User'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
}

export default new Strategy(options, async (payload, done) => {

  try {

    if (!payload || !payload.id)
      throw Error("No payload id")

    const user = await User.findOne({_id: payload.id})

    if(user) {
      return done(null, user)
    } else {
      return done(null, false)
    }

  } catch (err) {
    return done(err, false)
  }

})

