export const errorSchema = {
  description: 'Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string'
          }
        }
      }
    }
  }
}
