import 'module-alias/register'
import express, { Express, json, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'
import { setupRouters } from './setup-router'
import { jsonMiddleware } from '../middlewares/json'

const app = express()

export const App = (): Express => {
  app.use(cookieSession({
    signed: false,
    secure: true
  }))
  app.use(cors())
  app.use(jsonMiddleware(app))

  setupRouters(app)
  return app
}
