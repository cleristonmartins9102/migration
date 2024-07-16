export const inputPermissionSchema = {
  type: 'object',
  properties: {
    subject: {
      type: 'string'
    },
    action: {
      type: 'string',
      enum: ['read', 'create', 'delete', 'update']
    }
  }
}
