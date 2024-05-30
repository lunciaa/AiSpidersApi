import { HOUR } from "@/utils/constants"
import { RequestHandler, response } from "express"
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const responseWithToken: RequestHandler = async (req, res) => {

  const user = req.user
  if(!user)
      return res.status(401).json({msg: 'not_authorized'})

  const accessToken     = jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: HOUR })
  const refreshToken    = jwt.sign({ user }, REFRESH_TOKEN_SECRET, { expiresIn: HOUR*24 })

  res.cookie('token', accessToken, { httpOnly: true, secure: true })
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
  res.status(200).json({ok: "true"})
}

export default responseWithToken