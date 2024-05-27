import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'

import User from '@models/User'

export default new Strategy({usernameField: "email"}, async (email, password, done) => {
  try {
    const user = await User.findOne({email})

    if(!user)
      return done(null, false)

    bcrypt.compare(password, user.password, (err, result) => {

      if(err)
        return done(err)

      if(!result)
        return done(null, false)

      return done(null, user)

    })
  } catch(err) {
    return done(err)
  }
})