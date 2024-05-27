import { Router } from "express"

import accountRouter from './account'

const router = Router()

router.get('/', (req, res) => {
  res.json({msg: "Hello World"})
})

router.use('/account', accountRouter)

export default router