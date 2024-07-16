export const badRequest = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/Error'
      }
    }
  }
}
