import { Router } from 'express'
import passport from 'passport'

import handleMissingBody from '@/middlewares/handleMissingBody'
import { validateEmail, isEmailAvailable } from '@/utils/validator'
import AccountManager, { account_validate_error } from '@/managers/AccountManager'
import jwtAuth from '@/middlewares/jwtAuth'


const router = Router()

router.post('/register', handleMissingBody(["email", "password"]), async (req, res, next) => {
  const { email, password } = req.body

  const { errors, isServerError, user } = await AccountManager.register(email, password)

  if(isServerError)
    res.status(500).json({ok: "false"})
  else if(errors.length === 0) {
    req.user = user!
    next()
  }
  else {
    res.status(400).json({ok: "false", errors})
  }

}, AccountManager.sendToken)

router.post('/check-email', handleMissingBody(['email']), async (req, res) => {
  const { email } = req.body

  const errors: account_validate_error[] = []

  if(!validateEmail(email))
      errors.push({field: "email", msg: "invalid_email"})

  if(errors.length !== 0) {
    return res.status(400).json({ok: "false", errors: errors})
  }

  const available = await isEmailAvailable(email)

  res.status(200).json({available})

})

router.post('/login', passport.authenticate('local', {session: false}), AccountManager.sendToken)

router.get('/id', jwtAuth, (req, res) => {
  res.status(200).json({id: req.user!._id})
})

export default router