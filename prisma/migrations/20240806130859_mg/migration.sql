/*
  Warnings:

  - You are about to drop the column `addressId` on the `Members` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Members` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Members` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `Members` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `Members` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[memberId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_shopId_fkey";

-- DropIndex
DROP INDEX "Members_addressId_key";

-- DropIndex
DROP INDEX "Members_shopId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "memberId" INTEGER;

-- AlterTable
ALTER TABLE "Members" DROP COLUMN "addressId",
DROP COLUMN "contact",
DROP COLUMN "location",
DROP COLUMN "shopId",
DROP COLUMN "wallet";

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "memberId" INTEGER;

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "memberId" INTEGER,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "memberId" INTEGER,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_memberId_key" ON "Wallet"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_memberId_key" ON "Contact"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_memberId_key" ON "Address"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_memberId_key" ON "Shop"("memberId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
