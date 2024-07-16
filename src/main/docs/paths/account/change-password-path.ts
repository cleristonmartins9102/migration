export const changePasswordPath = {
  post: {
    tags: ['Account'],
    summary: 'API for change password',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              idaccount: {
                type: 'string'
              },
              currentPassword: {
                type: 'string'
              },
              newPassword: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'string'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
