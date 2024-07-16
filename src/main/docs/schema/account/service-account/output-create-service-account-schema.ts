export const outputCreatedServiceAccountSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    token_ref: {
      type: 'string'
    },
    created_by: {
      type: 'string'
    },
    updated_by: {
      type: 'string'
    },
    permissions: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/OutputPermissions'
      }
    }
  }
}
