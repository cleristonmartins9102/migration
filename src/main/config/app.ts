import 'module-alias/register'
import express, { Express } from 'express'
import cors from 'cors'
import { setupRouters } from './setup-router'
import { jsonMiddleware } from '../middlewares/json'
import { setupSwagger } from '../docs/swagger'

const app = express()

export const App = (): Express => {
  app.use(cors())
  app.use(jsonMiddleware(app))

  setupRouters(app)
  setupSwagger(app)
  return app
}
