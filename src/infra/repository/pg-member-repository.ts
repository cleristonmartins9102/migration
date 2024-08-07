import { CreateMemberRepository } from '@/data/domain/features/create-member-repository'
import { CreateMemberHouseHold, CreateMemberShop } from '@/data/domain/models';
import { MemberModel, UpdateMemberModel } from '@adamsfoodservice/core-models';
import { PrismaClient } from '@prisma/client';
import sm from '@adamsfoodservice/shared-modules'
import { MemberAlreadyExistsError } from '@/application/errors';
import { LoadByIdRepository, LoadByInternalIdRepository, UpdateMemberRepository } from '@/data/domain/features';
import { DeleteMemberRepository } from '@/data/domain/features/delete/delete-member-repository';

type Contracts = CreateMemberRepository & LoadByIdRepository & UpdateMemberRepository & LoadByInternalIdRepository & DeleteMemberRepository
export class PgMemberRepository implements Contracts {
  async create(memberData: CreateMemberHouseHold | CreateMemberShop): Promise<MemberModel> {
    const prisma = new PrismaClient();
    const memberExists = await prisma.member.findUnique({ where: { user_account_id: memberData.user_account_id } })
    if (memberExists) throw new MemberAlreadyExistsError(memberData.user_account_id)
    const { wallet, location, settings, shop, contact, payroll_number, ...onlyMemberData } = memberData as CreateMemberHouseHold & CreateMemberShop
    const memberPrismaResponse = await prisma.$transaction(async prisma => {
      const memberPrismaResponse = await prisma.member.create({ data: onlyMemberData as any })
      await prisma.contact.create({ data: { ...contact, member: { connect: { id: memberPrismaResponse.id } } } })
      await prisma.location.create({ data: { ...location, member: { connect: { id: memberPrismaResponse.id } } } })
      const deliveryDays = []
      if (settings.delivery_day_1) deliveryDays.push('mon')
      if (settings.delivery_day_2) deliveryDays.push('tue')
      if (settings.delivery_day_3) deliveryDays.push('wed')
      if (settings.delivery_day_4) deliveryDays.push('thu')
      if (settings.delivery_day_5) deliveryDays.push('fri')
      if (settings.delivery_day_6) deliveryDays.push('sat')
      if (settings.delivery_day_7) deliveryDays.push('sun')
      const settingsHandled = {
        can_deliver: settings.can_deliver,
        delivery_day: deliveryDays,
        push_asked: settings.push_asked,
        marketing_email: settings.transac_marketing_notifications.marketing.email,
        marketing_push: settings.transac_marketing_notifications.marketing.push,
        marketing_sms: settings.transac_marketing_notifications.marketing.sms,
        transactional_email: settings.transac_marketing_notifications.transactional.email,
        transactional_push: settings.transac_marketing_notifications.transactional.push,
        transactional_sms: settings.transac_marketing_notifications.transactional.sms
      }
      await prisma.settings.create({ data: { ...settingsHandled, member: { connect: { id: memberPrismaResponse.id } } } })
      await prisma.wallet.create({ data: { ...wallet, member: { connect: { id: memberPrismaResponse.id } } } })

      if (memberData instanceof CreateMemberHouseHold) {
        await prisma.memberHouseHold.create({ data: { payroll_number: memberData.payroll_number, member: { connect: { id: memberPrismaResponse.id } } } })
      }
      if (memberData instanceof CreateMemberShop) {
        await prisma.memberShop.create({ data: { ...memberData.shop, member: { connect: { id: memberPrismaResponse.id } } } })
      }
      return memberPrismaResponse
    })


    const memberModel: MemberModel = {
      id: memberPrismaResponse.id.toString(),
      ...memberData,
      updated_at: memberPrismaResponse.created_at,
      created_at: memberPrismaResponse.updated_at,
    }

    return memberModel
  }

  async loadById(id: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient();
    const prismaResponse: any = await prisma.member.findUnique(
      {
        where: { id: parseInt(id) },
        include: {
          location: true,
          contact: true,
          wallet: true,
          settings: true,
          membershop: true,
          memberhousehould: true,
        },
      })
      
    if (!prismaResponse) return null
    const memberModel = {
      id: prismaResponse.id.toString(),
      user_account_id: prismaResponse.user_account_id,
      first_name: prismaResponse.first_name,
      last_name: prismaResponse.last_name,
      customer_type: prismaResponse.customer_type,
      disabled: prismaResponse.disabled,
      email_verified: prismaResponse.email_verified,
      internal_id: prismaResponse.internal_id,
      invoiced_by: prismaResponse.invoiced_by,
      payroll_number: parseInt(prismaResponse.payroll_number as any),
      role: prismaResponse.role,
      branch: prismaResponse.branch as any,
      wallet: this.omitId(prismaResponse.wallet, 'memberId'),
      location: this.omitId(prismaResponse.location, 'memberId'),
      shop: this.omitId(prismaResponse.shop, 'memberId'),
      settings: this.omitId(prismaResponse.settings, 'memberId') as any,
      contact: this.omitId(prismaResponse.contact, 'memberId'),
      web_parent: prismaResponse.web_parent as any,
      updated_at: new sm.DateTime.MomentAdapter(prismaResponse.created_at),
      created_at: new sm.DateTime.MomentAdapter(prismaResponse.updated_at)
    }
    return memberModel
  }

  async loadByInternalId(internal_id: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient();
    const prismaResponse: any = await prisma.member.findUnique({
      where: {
        internal_id,
      },
      include: {
        memberhousehould: true,
        membershop: true,
        location: true,
        contact: true,
        settings: true,
        wallet: true,
      }
    })
    if (!prismaResponse) return null
    const memberModel = {
      id: prismaResponse.id.toString(),
      user_account_id: prismaResponse.user_account_id,
      first_name: prismaResponse.first_name,
      last_name: prismaResponse.last_name,
      customer_type: prismaResponse.customer_type,
      disabled: prismaResponse.disabled,
      email_verified: prismaResponse.email_verified,
      internal_id: prismaResponse.internal_id,
      invoiced_by: prismaResponse.invoiced_by,
      payroll_number: parseInt(prismaResponse.payroll_number as any),
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

  async update(memberData: UpdateMemberModel): Promise<boolean> {
    const { id, wallet, settings, location, shop, contact, payroll_number,...withoutId } = memberData
    const prisma = new PrismaClient();
    try {
      const data: any = withoutId
      if (payroll_number) data.memberhouse = { update: { payroll_number } }
      if (shop) data.shop = { update: shop }
      if (wallet) {
        delete (wallet as any).id
        data.wallet = { update: wallet }
      }
      if (settings) data.settings = { update: settings }
      if (location) data.location = { update: location }
      if (contact) data.contact = { update: contact }
      await prisma.member.update({ where: { id: parseInt(id) }, data })
      return '' as any
    } catch (error) {
      console.log(error)
    }
    return true
  }

  async delete(id: string): Promise<boolean> {
    const prisma = new PrismaClient()
    await prisma.member.delete({ where: { id: parseInt(id) } })
    return true
  }

  private omitId(obj: any, foreignKey?: string) {
    if (obj && typeof obj === 'object') {
      if (foreignKey) {
        const { [foreignKey]: _, id, ...rest } = obj
        return rest;
      } else {
        const { id, ...rest } = obj
        return rest
      }
    }
    return obj;
  }
}