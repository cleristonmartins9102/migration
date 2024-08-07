/*
  Warnings:

  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_memberId_fkey";

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "fcm_tokens" TEXT[];

-- DropTable
DROP TABLE "Shop";

-- CreateTable
CREATE TABLE "MemberHouseHold" (
    "id" SERIAL NOT NULL,
    "payroll_number" INTEGER NOT NULL,
    "memberId" INTEGER,

    CONSTRAINT "MemberHouseHold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberShop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "memberId" INTEGER,

    CONSTRAINT "MemberShop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberHouseHold_memberId_key" ON "MemberHouseHold"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberShop_memberId_key" ON "MemberShop"("memberId");

-- AddForeignKey
ALTER TABLE "MemberHouseHold" ADD CONSTRAINT "MemberHouseHold_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberShop" ADD CONSTRAINT "MemberShop_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
