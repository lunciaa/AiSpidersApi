import { jwt_payload } from "@/types/auth"
import { HOUR } from "@/utils/constants"
import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export const refreshToken: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if(!refreshToken) {
    return res.status(401).json({msg: "Access denied. No refresh token provided."})
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt_payload
    const accessToken = jwt.sign({user: decoded.user}, ACCESS_TOKEN_SECRET, { expiresIn: HOUR })

    res.cookie('token', accessToken, { httpOnly: true, secure: true })
    res.status(200).json({ok: true})
  } catch(err) {

  }
}