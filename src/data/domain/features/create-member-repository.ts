import { MemberModel } from '@adamsfoodservice/core-models';
import { CreateMemberModel } from '../models';
import { PrismaClient } from '@prisma/client';

export interface CreateMemberRepository {
  create (memberData: CreateMemberModel, prisma: PrismaClient): Promise<MemberModel>
}