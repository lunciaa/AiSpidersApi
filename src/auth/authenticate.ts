import jwt from 'jsonwebtoken'
import { RequestHandler } from "express";
import { jwt_payload } from '@/types/auth';
import { HOUR, TOKEN_COOKIE_SETTINGS } from '@/utils/constants';
import errors from '@/utils/errors';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET

const authenticate: RequestHandler = (req, res, next) => {

  const accessToken = req.cookies.token
  const refreshToken = req.cookies.refreshToken

  if(!accessToken && !refreshToken) {
    return res.status(401).json({msg: errors.no_tokens})
  }

  try {

    const decoded = jwt.verify(accessToken, ACCESS_SECRET) as jwt_payload
    req.user = decoded.user
    next();

  } catch (err) {

    if(!refreshToken)
      return res.status(401).json({msg: errors.no_refresh_token})

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as jwt_payload
    const newAccessToken = jwt.sign({user: decoded.user}, ACCESS_SECRET, { expiresIn: HOUR })

    res.cookie('token', newAccessToken, TOKEN_COOKIE_SETTINGS)
  }

}

export default authenticate