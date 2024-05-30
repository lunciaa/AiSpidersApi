'use strict';

import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import fs from 'fs'
import https from 'https'
import pc from 'picocolors'
import csrf from 'tiny-csrf'

dotenv.config()

import router from '@/routing/router'
import db_connect from './db/connect';
import cookieParser from 'cookie-parser';
import checkEnv from './utils/checkEnv';
import errorHandler from './middlewares/errorHandler';

var key: string
var cert: string

checkEnv()

const PORT = process.env.PORT || 5000;

console.log(pc.bold("App is starting!"))

try {

  key = fs.readFileSync(process.env.SSL_KEY as string, 'utf-8')
  cert = fs.readFileSync(process.env.SSL_CERT as string, 'utf-8')

  if (!key || !cert)
    throw Error()

} catch(err) {
  console.log(pc.red("No SSL certificate AND/OR key!"))
  console.log(pc.red("Server is stopping..."))
  process.exit(1)
}

(async () => {
  const db = await db_connect()
})()


const app = express()


// Settings
app.disable("x-powered-by")

// Parse application/json and application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Parse cookie
app.use(cookieParser(process.env.COOKIES_SECRET))


// csrf protection
app.use(csrf(process.env.CSRF_SECRET))
app.get('/api/v1/csrf-token', (req, res) => {
  res.json({csrf_token: req.csrfToken()})
})

// Logging
app.use(morgan("dev"))

// Routing
app.use('/api/v1', router)

// Error handling
app.use(errorHandler)

const server = https.createServer({key, cert}, app)
server.listen(PORT, () => {
  console.log(`Server is listening on https://localhost:${PORT}`)
})