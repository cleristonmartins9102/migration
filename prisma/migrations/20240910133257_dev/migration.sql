/*
  Warnings:

  - You are about to drop the `MemberHouseHold` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MemberShop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shop_name` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MemberHouseHold" DROP CONSTRAINT "MemberHouseHold_memberId_fkey";

-- DropForeignKey
ALTER TABLE "MemberShop" DROP CONSTRAINT "MemberShop_memberId_fkey";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "payroll_number" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shop_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "MemberHouseHold";

-- DropTable
DROP TABLE "MemberShop";
