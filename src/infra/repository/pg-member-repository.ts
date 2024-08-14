import { CreateMemberRepository } from '@/data/domain/features/create-member-repository'
import { CreateMemberHouseHold, CreateMemberShop } from '@/data/domain/models';
import { MemberModel, UpdateMemberModel } from '@adamsfoodservice/core-models';
import { PrismaClient } from '@prisma/client';
import sm from '@adamsfoodservice/shared-modules'
import { MemberAlreadyExistsError, PrismaError } from '@/application/errors'
import { LoadByIdRepository, LoadByInternalIdRepository, LoadByUserAccountIdRepository, UpdateMemberRepository } from '@/data/domain/features';
import { DeleteMemberRepository } from '@/data/domain/features/delete/delete-member-repository';
import { LoadAllRepository, LoadByPhoneNumberRepository, LoadUserWalletRepository } from '@/data/domain/features/load';
import { Wallet } from '@adamsfoodservice/core-models/dist/types/models/general';
import { storage } from '@/application/storage/storage';

type Contracts = CreateMemberRepository 
& LoadByIdRepository 
& UpdateMemberRepository 
& LoadByInternalIdRepository 
& LoadByUserAccountIdRepository 
& DeleteMemberRepository 
& LoadByPhoneNumberRepository 
& LoadAllRepository
& LoadUserWalletRepository
export class PgMemberRepository implements Contracts {
  async create(memberData: CreateMemberHouseHold | CreateMemberShop): Promise<MemberModel> {
    const prisma = new PrismaClient();
    const memberExists = await prisma.member.findUnique({ where: { user_account_id: memberData.user_account_id } })
    if (memberExists) throw new MemberAlreadyExistsError(memberData.user_account_id)
    const { wallet, location, settings, shop, contact, payroll_number, ...onlyMemberData } = memberData as CreateMemberHouseHold & CreateMemberShop
    const memberPrismaResponse = await prisma.$transaction(async prisma => {
      const memberPrismaResponse = await prisma.member.create({ data: { ...onlyMemberData, internal_id: Math.floor(100000 + Math.random() * 900000).toString() } as any })
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

  async loadAll(): Promise<MemberModel[]> {
    const prisma = new PrismaClient();
    const prismaResponse: any = await prisma.member.findMany(
      {
        include: {
          location: true,
          contact: true,
          wallet: true,
          settings: true,
          membershop: true,
          memberhousehould: true,
        },
      })

    if (!prismaResponse) return []
    const response = []
    for (const member of prismaResponse) {
      const memberModel = {
        id: member.id.toString(),
        user_account_id: member.user_account_id,
        first_name: member.first_name,
        last_name: member.last_name,
        customer_type: member.customer_type,
        disabled: member.disabled,
        email_verified: member.email_verified,
        internal_id: member.internal_id,
        invoiced_by: member.invoiced_by,
        payroll_number: parseInt(member.payroll_number as any),
        role: member.role,
        branch: member.branch as any,
        wallet: this.omitId(member.wallet, 'memberId'),
        location: this.omitId(member.location, 'memberId'),
        shop: this.omitId(member.shop, 'memberId'),
        settings: this.omitId(member.settings, 'memberId') as any,
        contact: this.omitId(member.contact, 'memberId'),
        web_parent: member.web_parent as any,
        updated_at: new sm.DateTime.MomentAdapter(member.created_at),
        created_at: new sm.DateTime.MomentAdapter(member.updated_at)
      }
      response.push(memberModel)
    }
    
    return response
  }

  async loadByUserAccountId(userAccountId: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient();
    const prismaResponse: any = await prisma.member.findUnique(
      {
        where: { user_account_id: userAccountId },
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

  async loadWallet (userId?: string): Promise<Wallet | null> {
    const prisma = new PrismaClient();
    const user_account_id = (storage.currentUser.get() as any).id
    const prismaResponse: any = await prisma.member.findUnique(
      {
        where: { user_account_id },
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
    const walletModel: Wallet = {
      balance: prismaResponse.wallet.balance
    }
    return walletModel
  }

  async loadByInternalId(internal_id: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient();
    try {
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
    } catch (error) {
      if (error instanceof Error)
      throw new PrismaError(error)
    }
    return null
  }

  async loadByPhoneNumber(phoneNumber: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient();
    const prismaResponse: any = await prisma.member.findFirst({
      where: {
        contact: {
          phone_number: phoneNumber
        }
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
    const { id, wallet, settings, location, shop, contact, payroll_number, ...withoutId } = memberData
    const prisma = new PrismaClient();
    try {
      const data: any = withoutId
      if (payroll_number) data.memberhouse = { update: { payroll_number } }
      if (shop) data.shop = { update: shop }
      if (wallet) {
        data.wallet = { update: this.omitMemberId(wallet) }
      }
      if (settings) data.settings = { update: this.omitMemberId(settings) }
      if (location) data.location = { update: this.omitMemberId(location) }
      if (contact) data.contact = { update: this.omitMemberId(contact) }
      await prisma.member.update({ where: { id: parseInt(id as any) }, data })
      return '' as any
    } catch (error) {
      if (error instanceof Error)
      console.log(error.message)
      throw new PrismaError(error as any)
    }
    return true
  }

  async delete(id: string): Promise<boolean> {
    const prisma = new PrismaClient()
    await prisma.member.delete({ where: { id: parseInt(id) } })
    return true
  }

  private omitMemberId(obj: any, foreignKey?: string) {
    if (obj && typeof obj === 'object') {
      if (foreignKey) {
        const { [foreignKey]: _, id, ...rest } = obj
        return rest;
      } else {
        const { memberId, ...rest } = obj
        return rest
      }
    }
    return obj;
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