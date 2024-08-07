/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_shopId_fkey";

-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "user_account_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "customer_type" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL,
    "email_verified" BOOLEAN NOT NULL,
    "internal_id" TEXT NOT NULL,
    "invoiced_by" TEXT NOT NULL,
    "payroll_number" BIGINT NOT NULL,
    "role" TEXT NOT NULL,
    "web_parent" DECIMAL(65,30) NOT NULL,
    "settings" JSONB NOT NULL,
    "contact" JSONB NOT NULL,
    "branch" JSONB NOT NULL,
    "wallet" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "shopId" INTEGER,
    "addressId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_user_account_id_key" ON "Members"("user_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Members_shopId_key" ON "Members"("shopId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_addressId_key" ON "Members"("addressId");

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
