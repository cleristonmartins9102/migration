// src/schemas/MemberResponseSchema.ts

export const memberResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    user_account_id: {
      type: 'string',
    },
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    customer_type: {
      type: 'string',
    },
    disabled: {
      type: 'boolean',
    },
    email_verified: {
      type: 'boolean',
    },
    internal_id: {
      type: 'string',
    },
    invoiced_by: {
      type: 'string',
    },
    role: {
      type: 'string',
    },
    branch: {
      type: 'object',
      properties: {
        internal_id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
    },
    payroll_number: {
      type: 'integer',
    },
    wallet: {
      type: 'object',
      properties: {
        balance: {
          type: 'integer',
        },
      },
    },
    location: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
        },
        postcode: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        number: {
          type: 'string',
        },
      },
    },
    settings: {
      type: 'object',
      properties: {
        can_deliver: {
          type: 'boolean',
        },
        push_asked: {
          type: 'boolean',
        },
        transac_marketing_notifications: {
          type: 'object',
          properties: {
            marketing: {
              type: 'object',
              properties: {
                email: {
                  type: 'boolean',
                },
                push: {
                  type: 'boolean',
                },
                sms: {
                  type: 'boolean',
                },
              },
            },
            transactional: {
              type: 'object',
              properties: {
                email: {
                  type: 'boolean',
                },
                push: {
                  type: 'boolean',
                },
                sms: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
    },
    contact: {
      type: 'object',
      properties: {
        phone_number: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
      },
    },
    web_parent: {
      type: 'integer',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
    },
  },
};
