import { PrismaClient } from '@prisma/client';
import * as PgMem from 'pg-mem';

export class MakeDsStub {
  static instance: any;
  static db: any;
  static prisma: PrismaClient;

  async build(): Promise<any> {
    if (MakeDsStub.instance) {
      return MakeDsStub.instance;
    }

    const db = PgMem.newDb();
    MakeDsStub.db = db;

    // Execute SQL initialization
    await db.public.none(`
      CREATE TABLE "Members" (
        "id" SERIAL PRIMARY KEY,
        "user_account_id" TEXT NOT NULL,
        "first_name" TEXT NOT NULL,
        "last_name" TEXT NOT NULL,
        "customer_type" TEXT NOT NULL,
        "disabled" BOOLEAN NOT NULL,
        "email_verified" BOOLEAN NOT NULL,
        "internal_id" TEXT NOT NULL,
        "invoiced_by" TEXT NOT NULL,
        "payroll_number" NUMERIC(15, 5) NOT NULL,
        "role" TEXT NOT NULL,
        "web_parent" NUMERIC(15, 5) NOT NULL,
        "settings" JSONB NOT NULL,
        "contact" JSONB NOT NULL,
        "branch" JSONB NOT NULL,
        "wallet" JSONB NOT NULL,
        "location" JSONB NOT NULL,
        "shop" JSONB NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // PrismaClient requires a database URL, but we'll mock this
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: 'postgresql://localhost:5432/test', // Mock URL
        },
      },
    });

    MakeDsStub.instance = { db, prisma };
    MakeDsStub.prisma = prisma;
    return { db, prisma };
  }

  async save(sql: string, params: any[] = []): Promise<any> {
    return MakeDsStub.db.public.query(sql, params);
  }
}
