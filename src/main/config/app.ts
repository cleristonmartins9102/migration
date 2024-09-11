import 'module-alias/register'
import express, { Express } from 'express'
import cors from 'cors'
import { setupRouters } from './setup-router'
import { jsonMiddleware } from '../middlewares/json'
import { setupSwagger } from '../docs/swagger'
import { setupLogger } from './setup-logger'
import { setupGraphql } from './setup-graphql'
const app = express()

export const createApp = async (): Promise<Express> => {
  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(jsonMiddleware(app))
  await setupRouters(app)
  setupSwagger(app)
  setupGraphql(app)
  setupLogger()
  return app
}
