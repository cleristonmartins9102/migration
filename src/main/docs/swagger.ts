import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { Express } from 'express'
import { notFound, badRequest, serverError, unauthorized, errorSchema } from './components'

export const setupSwagger = (app: Express): void => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Scaffolding Account API',
        version: '1.0.0',
        description: 'Documentation detailing API specifications'
      },
      components: {
        schemas: {
          NotFound: notFound,
          Error: errorSchema,
          BadRequest: badRequest,
          ServerError: serverError,
          Unauthorized: unauthorized
        }

      }
    },
    apis: ['./src/main/routers/*.ts'] // Ensure this points to your route files
  }

  const swaggerDocs = swaggerJsDoc(swaggerOptions)

  app.use('/api-json', (req: any, res: any): void => {
    res.json(swaggerDocs)
  })

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
