import { CreateMemberRepository } from '@/data/domain/features/create-member-repository'
import { CreateMemberModel } from '@/data/domain/models';
import { MemberModel } from '@adamsfoodservice/core-models';
import { PrismaClient } from '@prisma/client';
import sm from '@adamsfoodservice/shared-modules'
import { MemberAlreadyExistsError } from '@/application/errors';
import { LoadMemberByIdRepository, UpdateMemberModel, UpdateMemberRepository } from '@/data/domain/features';

export class PgMemberRepository implements CreateMemberRepository, LoadMemberByIdRepository, UpdateMemberRepository {
  async create(memberData: CreateMemberModel): Promise<MemberModel> {
    const prisma = new PrismaClient();
    const memberExists = await prisma.members.findUnique({ where: { user_account_id: memberData.user_account_id } })
    if (memberExists) throw new MemberAlreadyExistsError(memberData.user_account_id)
      const prismaResponse = await prisma.members.create({
    data: memberData
    })
    const memberModel: MemberModel = {
      id: prismaResponse.id.toString(),
      user_account_id: prismaResponse.user_account_id,
      first_name: prismaResponse.first_name,
      last_name: prismaResponse.last_name,
      customer_type: prismaResponse.customer_type,
      disabled: prismaResponse.disabled,
      email_verified: prismaResponse.email_verified,
      internal_id: prismaResponse.internal_id,
      invoiced_by: prismaResponse.invoiced_by,
      payroll_number: parseFloat(prismaResponse.payroll_number as any),
      role: prismaResponse.role,
      branch: prismaResponse.branch as any,
      wallet: prismaResponse.wallet as any,
      location: prismaResponse.location as any,
      shop: prismaResponse.shop as any,
      settings: prismaResponse.settings as any,
      contact: prismaResponse.contact as any,
      web_parent: prismaResponse.web_parent as any,
      updated_at: new sm.DateTime.MomentAdapter(prismaResponse.created_at),
      created_at: new sm.DateTime.MomentAdapter(prismaResponse.updated_at)
    }
    return memberModel
  }

  async loadById(id: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient();
    const prismaResponse = await prisma.members.findUnique({ where: { id: parseInt(id) } })
    if (!prismaResponse) return null
    const memberModel: MemberModel = {
      id: prismaResponse.id.toString(),
      user_account_id: prismaResponse.user_account_id,
      first_name: prismaResponse.first_name,
      last_name: prismaResponse.last_name,
      customer_type: prismaResponse.customer_type,
      disabled: prismaResponse.disabled,
      email_verified: prismaResponse.email_verified,
      internal_id: prismaResponse.internal_id,
      invoiced_by: prismaResponse.invoiced_by,
      payroll_number: parseFloat(prismaResponse.payroll_number as any),
      role: prismaResponse.role,
      branch: prismaResponse.branch as any,
      wallet: prismaResponse.wallet as any,
      location: prismaResponse.location as any,
      shop: prismaResponse.shop as any,
      settings: prismaResponse.settings as any,
      contact: prismaResponse.contact as any,
      web_parent: prismaResponse.web_parent as any,
      updated_at: new sm.DateTime.MomentAdapter(prismaResponse.created_at),
      created_at: new sm.DateTime.MomentAdapter(prismaResponse.updated_at)
    }
    return  memberModel
  }

  async update(memberData: UpdateMemberModel): Promise<boolean> {
    const { id, ...withoutId } = memberData
    const prisma = new PrismaClient();
    await prisma.members.update({ where: { id: parseInt(id) }, data: withoutId } )
    return '' as any
  }
}