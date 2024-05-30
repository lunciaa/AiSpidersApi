import { Router } from 'express'

import handleMissingBody, { handleMissingCredentials } from '@/middlewares/handleMissingBody'
import { validateEmail, isEmailAvailable } from '@/utils/validator'
import AccountManager, { account_validate_error } from '@/managers/AccountManager'
import signIn from '@/auth/signIn'
import responseWithToken from '@/auth/responseWithToken'
import authenticate from '@/auth/authenticate'

import _errors from '@/utils/errors'


const router = Router()

router.get('/', authenticate, (req, res) => {
  const user = req.user!
  res.status(200).json({id: user.id, displayName: user.display_name || null})
})

router.post('/register', handleMissingCredentials, async (req, res, next) => {
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

}, responseWithToken)

router.post('/check-email', handleMissingBody(['email']), async (req, res) => {
  const { email } = req.body

  const errors: account_validate_error[] = []

  if(!validateEmail(email))
      errors.push({field: "email", msg: _errors.invalid_email})

  if(errors.length !== 0) {
    return res.status(400).json({ok: "false", errors: errors})
  }

  const available = await isEmailAvailable(email)

  res.status(200).json({available})

})

router.post('/login', handleMissingCredentials, signIn, responseWithToken)

export default router