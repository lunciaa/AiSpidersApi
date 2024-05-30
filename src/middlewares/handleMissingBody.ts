import errors from "@/utils/errors"
import { RequestHandler } from "express"

const handleMissingBody = (body: string[]) => {
  const middleware: RequestHandler = (req, res, next) => {

    let i = 0

    body.forEach(param => {
      if(req.body[param])
        i++
    })

    if (i === body.length)
      next()
    else res.status(400).json({ok: false, msg: errors.invalid_request})
  }

  return middleware
}

export const handleMissingCredentials = handleMissingBody(['email', 'password'])

export default handleMissingBody