export interface DeleteMember {
  delete (inputData: DeleteMember.InputData): Promise<boolean>
}

export namespace DeleteMember {
  export type InputData = {
    id?: string
    internal_id?: string
  }
}