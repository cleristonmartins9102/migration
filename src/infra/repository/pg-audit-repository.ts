import { PrismaError } from '@/application/errors';
import { AuditModel } from '@/data/models/audit-model';
import { PrismaClient } from '@prisma/client';

export class PgAuditRepository  {
  async create(params: PgAuditRepository.CreateParams): Promise<boolean> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
    try {
      const audityResponse: any = await prisma.audit.create({ data: params })
      
      return audityResponse
    } catch (error) {
      console.log(error)
      if (error instanceof Error)
      throw new PrismaError(error)
    }
    return true 
  }

  async loadByWebParent (wp: string): Promise<AuditModel | null> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    })
    if (wp === undefined || wp === undefined) {
      return null;
    }
    return await prisma.audit.findFirst({ where: { source_record_id: wp } }) as any
  }
}

export namespace PgAuditRepository {
  export type CreateParams = Omit<AuditModel, 'id' | 'created_at' | 'updated_at'>
}