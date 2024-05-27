import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'

import User from "@/db/models/User"
import { validateEmail, validatePassword, isEmailAvailable } from "@/utils/validator"
import { DAY } from '@/utils/constants'
import { IUserSchema } from '@/types/schemas'

const JWT_SECRET = process.env.JWT_SECRET as string

export type account_validate_error = {
  field: "email" | "password",
  msg: string
}

export const register = async (email: string, password: string) => {
  const errors: account_validate_error[] = []
  let isServerError = false

  if(!validatePassword(password))
    errors.push({field: 'password', msg: 'invalid_password'})

  if(!validateEmail(email))
    errors.push({field: 'email', msg: 'invalid_email'})
  else if(!await isEmailAvailable(email))
    errors.push({field: 'email', msg: 'email_taken'})

  let user: IUserSchema | null = null

  if (errors.length === 0) {
    try {
      const hashed_password = await bcrypt.hash(password, 10)

      user = await User.create({email, password: hashed_password})
      if(!user)
        throw Error("user not created")

    } catch(err) {
      console.error(err)
      isServerError=true
    }
  }

  return {
    errors,
    isServerError,
    user
  }
}

export const sendToken: RequestHandler = async (req, res) => {

  const user = req.user
  if(!user)
      return res.status(401)
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: 7*DAY })

  return res.status(200).json({token, id: user._id})
}

export default {
  register, sendToken
}