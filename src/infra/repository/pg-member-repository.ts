import { CreateMemberRepository } from '@/data/domain/features/create-member-repository'
import { CreateMemberShop } from '@/data/domain/models';
import { CreateMemberModel, MemberModel, UpdateMemberModel } from '@adamsfoodservice/core-models';
import { PrismaClient } from '@prisma/client';
import sm, { SQL } from '@adamsfoodservice/shared-modules'
import { MemberAlreadyExistsError, PrismaError } from '@/application/errors'
import { LoadByIdRepository, LoadByInternalIdRepository, LoadByUserAccountIdRepository, UpdateMemberRepository } from '@/data/domain/features';
import { DeleteMemberRepository } from '@/data/domain/features/delete/delete-member-repository';
import { LoadAllRepository, LoadByEmailRepository, LoadByInternalIdBatchRepository, LoadByPhoneNumberRepository, LoadUserWalletRepository } from '@/data/domain/features/load';
import { Wallet } from '@adamsfoodservice/core-models/dist/types/models/general';
import { storage } from '@/application/storage/storage';
import { LoadWithCriteriaRepository } from '@/data/domain/features/load/load-with-criteria-repository';
import { Contracts } from '@adamsfoodservice/shared-modules'

type Contracts = CreateMemberRepository 
& LoadByIdRepository 
& UpdateMemberRepository 
& LoadByInternalIdRepository 
& LoadByUserAccountIdRepository 
& DeleteMemberRepository 
& LoadByPhoneNumberRepository 
& LoadAllRepository
& LoadUserWalletRepository
& LoadByEmailRepository
& LoadByInternalIdBatchRepository
& LoadWithCriteriaRepository
export class PgMemberRepository implements Contracts {
  async create(memberData: CreateMemberModel, prismas: PrismaClient): Promise<MemberModel> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    let memberExists = await prisma.member.findUnique({ where: { user_account_id: memberData.user_account_id } })
    if (memberExists) throw new MemberAlreadyExistsError(memberData.user_account_id)
    memberExists = await prisma.member.findUnique({ where: { internal_id: memberData.internal_id } })
    if (memberExists) throw new MemberAlreadyExistsError(memberData.internal_id, 'internal_id')

    const { wallet, location, settings, contact, shop,  ...onlyMemberData } = memberData as any
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
    const memberPrismaResponse = await prisma.member.create({ data: { ...onlyMemberData, internal_id: memberData.internal_id, shop_name: memberData.shop.name } as any })

   await prisma.$transaction([
      prisma.contact.create({ data: { ...contact, member: { connect: { id: memberPrismaResponse.id } } } }),
      prisma.location.create({ data: { ...location, member: { connect: { id: memberPrismaResponse.id } } } }),
      prisma.settings.create({ data: { ...settingsHandled, member: { connect: { id: memberPrismaResponse.id } } } }),
      prisma.wallet.create({ data: { ...wallet, member: { connect: { id: memberPrismaResponse.id } } } }),
    ])

    const memberModel: MemberModel = {
      id: memberPrismaResponse.id.toString(),
      ...memberData,
      updated_at: memberPrismaResponse.created_at,
      created_at: memberPrismaResponse.updated_at,
    }

    return memberModel
  }

  async loadByEmail(email: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    const prismaResponse: any = await prisma.member.findFirst(
      {
        where: { contact: { email } },
        include: {
          location: true,
          contact: true,
          wallet: true,
          settings: true
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

  async loadById(id: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    const prismaResponse: any = await prisma.member.findUnique(
      {
        where: { id: parseInt(id) },
        include: {
          location: true,
          contact: true,
          wallet: true,
          settings: true
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
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    const prismaResponse: any = await prisma.member.findMany(
      {
        include: {
          location: true,
          contact: true,
          wallet: true,
          settings: true,
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

  async loadWithCriteria(criteria: Contracts.Predicate.Expression): Promise<MemberModel[]> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    const dump: any = criteria.dump(SQL.Criteria.DataSourceType.Prisma)
    try {
      const prismaResponse: any = await prisma.member.findMany(
        {      
          where: dump,
          include: {
            location: true,
            contact: true,
            wallet: true,
            settings: true,
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

    } catch (error) {
      if (error instanceof Error)
      if (error.name === 'PrismaClientValidationError') {
        return []
      }
    }
    return []
  }

  async loadByInternalIdBatch(internalIdBatch: string[]): Promise<MemberModel[]> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    const prismaResponse: any = await prisma.member.findMany({
        where: { internal_id: { in: internalIdBatch } }, 
        include: {
          location: true,
          contact: true,
          wallet: true,
          settings: true,
        },
  } )
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
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
    const prismaResponse: any = await prisma.member.findUnique(
      {
        where: { user_account_id: userAccountId },
        include: {
          location: true,
          contact: true,
          wallet: true,
          settings: true,
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
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    const user_account_id = (storage.currentUser.get() as any).id
    const prismaResponse: any = await prisma.member.findUnique(
      {
        where: { user_account_id },
        include: {
          location: true,
          contact: true,
          wallet: true,
          settings: true,
        },
      })

    if (!prismaResponse) return null
    const walletModel: Wallet = {
      balance: prismaResponse.wallet.balance
    }
    return walletModel
  }

  async loadByInternalId(internal_id: string): Promise<MemberModel | null> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    try {
      const prismaResponse: any = await prisma.member.findMany({
        where: {
          internal_id,
        },
        include: {
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
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });;
    const prismaResponse: any = await prisma.member.findFirst({
      where: {
        contact: {
          phone_number: phoneNumber
        }
      },
      include: {
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
    const { id, wallet, settings, location, shop, contact, payroll_number, updatedFields, ...withoutId } = memberData as any
    try {
      const prisma = new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL as string
          }
        } 
      });
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
      throw new PrismaError(error as any)
    }
    return true
  }

  async delete(id: string): Promise<boolean> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
    await prisma.member.delete({ where: { id: parseInt(id) } })
    return true
  }

  async deleteByUserAccountId(id: string): Promise<boolean> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
    await prisma.member.delete({ where: { user_account_id: id } })
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