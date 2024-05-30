import User from "@/db/models/User";
import bcrypt from 'bcrypt'
import { RequestHandler } from "express";
import errors from "@/utils/errors";

const signIn: RequestHandler = async (req, res, next) => {
  try {

    const { email, password } = req.body

    const user = await User.findOne({email})
    if(!user)
      return res.status(401).json({msg: errors.invalid_credentials})

    bcrypt.compare(password, user.password, (err, result) => {
      if(err)
        return res.status(500).json({msg: errors.generic})

      if(!result) {
        return res.status(401).json({msg: errors.invalid_credentials})
      } else {
        req.user = user
        next()
      }
    })


  } catch(err) {
    return res.status(500).json({msg: errors.generic})
  }
}

export default signIn