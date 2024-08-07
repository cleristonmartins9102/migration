/*
  Warnings:

  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_memberId_fkey";

-- DropTable
DROP TABLE "Members";

-- CreateTable
CREATE TABLE "Member" (
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
    "branch" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_user_account_id_key" ON "Member"("user_account_id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
