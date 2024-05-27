'use strict';

import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import fs from 'fs'
import https from 'https'
import pc from 'picocolors'

dotenv.config()

import router from '@/routing/router'
import db_connect from './db/connect';
import passport from '@/auth/passport'

var key: string
var cert: string

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

// Body parser
app.use(express.json())

// Logging
app.use(morgan("dev"))

// Auth
passport()

// Routing
app.use('/api/v1', router)

const server = https.createServer({key, cert}, app)
server.listen(PORT, () => {
  console.log(`Server is listening on https://localhost:${PORT}`)
})