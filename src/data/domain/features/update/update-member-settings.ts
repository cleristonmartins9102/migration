export interface UpdateMemberSettings {
  update (param: UpdateMemberSettings.Params): Promise<boolean>
}

export namespace UpdateMemberSettings {
  export type Params = {
    id: string
    resource: Resource
    config: {
      flag: boolean
      type: Types
    }
  }

  export enum Types {
    transactional = 'transactional',
    marketing = 'marketing'
  }

  export enum Resource {
    sms = 'sms',
    email = 'email',
    push = 'push'
  }
}