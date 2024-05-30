import errors from "@/utils/errors"
import { RequestHandler } from "express"

export default (query: string[]) => {
  const middleware: RequestHandler = (req, res, next) => {

    let i = 0

    query.forEach(param => {
      if(req.query[param])
        i++
    })

    if (i === query.length)
      next()
    else res.status(400).json({ok: false, msg: errors.invalid_request})
  }

  return middleware
}