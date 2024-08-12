export interface UpdateMemberSettings {
  update (param: UpdateMemberSettings.Params): Promise<boolean>
}

export namespace UpdateMemberSettings {
  export type Params = {
    resource: Resource
    config: {
      flag: boolean
      type: Types
    }
  }

  export enum Types {
    transactional = 'transactional',
    marketing = 'marketing',
    general = 'general'
  }

  export enum Resource {
    sms = 'sms',
    email = 'email',
    push = 'push',
    pushAsked = 'push_asked'
  }
}