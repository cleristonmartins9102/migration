import 'module-alias/register'
import express, { Express } from 'express'
import cors from 'cors'
import { setupRouters } from './setup-router'
import { jsonMiddleware } from '../middlewares/json'
import { setupLogger } from './setup-logger'
const app = express()

export const createApp = async (): Promise<Express> => {
  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(jsonMiddleware(app))
  await setupRouters(app)
  setupLogger()
  return app
}
