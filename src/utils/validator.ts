import User from "@/db/models/User"

const PASSWORD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const EMAIL_REGEX=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export const validatePassword = (password: string) => {
  return PASSWORD_REGEX.test(password)
}

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email)
}

export const isEmailAvailable = async (email: string) => {
  const user = await User.findOne({email})
  return !user
}