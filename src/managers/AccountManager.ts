import bcrypt from 'bcrypt'

import User from "@/db/models/User"
import { validateEmail, validatePassword, isEmailAvailable } from "@/utils/validator"
import { IUserSchema } from '@/types/schemas'

export type account_validate_error = {
  field: "email" | "password",
  msg: string
}

export const register = async (email: string, password: string) => {
  const errors: account_validate_error[] = []
  let isServerError = false

  if(!validatePassword(password))
    errors.push({field: 'password', msg: 'errors_form_invalid_password'})

  if(!validateEmail(email))
    errors.push({field: 'email', msg: 'errors_form_invalid_email'})
  else if(!await isEmailAvailable(email))
    errors.push({field: 'email', msg: 'errors_form_email_taken'})

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

export default {
  register
}