import { ApolloServer } from '@apollo/server'
import { resolvers } from '../graphql/resolvers'
import { typeDefs } from '../graphql/defs'
import { GraphQLError } from 'graphql'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'

const handleErrors = (response: any, errors: any[]): void => {
  if (typeof errors !== 'undefined') {
    errors.forEach((error: GraphQLError) => {
      if (checkError(error, 'UnauthorizedError')) {
        response.http.status = 401
        response.data = undefined
      } else if (checkError(error, 'BadRequestError')) {
        response.http.status = 400
        response.data = undefined
      }
    })
  }
}

const checkError = (error: GraphQLError, errorName: string): boolean => [error.name, error?.originalError?.name].some(name => name === errorName)

export const setupGraphql = async (app: any): Promise<void> => {
  app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(await startApolloServer(), {
    context: async ({ req }) => {
      const data = { headers: req.headers }
      return data
    }
  }))
}

export const startApolloServer = async (): Promise<any> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
      {
        requestDidStart: () => ({
          willSendResponse: ({ response, errors }: { response: any, errors: [] }) => { handleErrors(response, errors) }
        }) as any
      }
    ]
  })
  await server.start()
  return server
}
