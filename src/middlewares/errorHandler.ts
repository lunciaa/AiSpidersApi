import { IHTTPError } from "@/types/errors"
import errors from "@/utils/errors"
import { NextFunction, Request, Response } from "express"
import pc from 'picocolors'


const parseErrorByMessage = (error: IHTTPError) => {
  const { message } = error
  console.error(pc.red(`Catched error: ${message}`))
  console.error(error)

  if(message.includes('valid CSRF token')) {
    error.code = 400
    error.msg = errors.no_csrf_token
  } else {
    error.code = 500
    error.msg = errors.unknown
  }

  return error
}

export default (err: IHTTPError, req: Request, res: Response, next: NextFunction) => {
  err = parseErrorByMessage(err)


  res.status(err.code).json({msg: err.msg})
}