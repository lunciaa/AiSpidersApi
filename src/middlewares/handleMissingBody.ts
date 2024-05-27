import { RequestHandler } from "express"

export default (body: string[]) => {
  const middleware: RequestHandler = (req, res, next) => {

    let i = 0

    body.forEach(param => {
      if(req.body[param])
        i++
    })

    if (i === body.length)
      next()
    else res.status(400).json({ok: false, msg: "Invalid request data"})
  }

  return middleware
}