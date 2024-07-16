export const unauthorized = {
  description: 'Unhauthorized',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/Error'
      }
    }
  }
}
