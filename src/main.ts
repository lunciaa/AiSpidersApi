'use strict';

import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import fs from 'fs'
import https from 'https'
import pc from 'picocolors'

dotenv.config()

import router from '@/routing/router'

var key: string
var cert: string

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


const PORT = process.env.PORT || 5000;


const app = express()

// Middlewares
app.use(morgan("dev"))
app.use(router)

const server = https.createServer({key, cert}, app)
server.listen(PORT, () => {
  console.log(`Server is listening on https://localhost:${PORT}`)
})