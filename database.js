import express from 'express'
import env from 'dotenv'

const app = express()
env.config()

import "./files.js"

const port = process.env.PORT
app.listen(port,()=>{
  console.log("system started")
})