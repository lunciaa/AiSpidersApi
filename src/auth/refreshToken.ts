import { jwt_payload } from "@/types/auth"
import { HOUR } from "@/utils/constants"
import errors from "@/utils/errors"
import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export const refreshToken: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if(!refreshToken) {
    return res.status(401).json({msg: errors.no_refresh_token})
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt_payload
    const accessToken = jwt.sign({user: decoded.user}, ACCESS_TOKEN_SECRET, { expiresIn: HOUR })

    res.cookie('token', accessToken, { httpOnly: true, secure: true })
    res.status(200).json({ok: true})
  } catch(err) {
    res.status(401).json({msg: errors.invalid_refresh_token})
  }
}