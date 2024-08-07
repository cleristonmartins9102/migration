export interface AcceptMember {
  accept (id: string, internal_id: string): Promise<boolean>
}