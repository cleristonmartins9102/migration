/*
  Warnings:

  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "members";

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
    "contact" JSONB NOT NULL,
    "branch" JSONB NOT NULL,
    "wallet" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "shopId" INTEGER,
    "addressId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_user_account_id_key" ON "Member"("user_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_shopId_key" ON "Member"("shopId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_addressId_key" ON "Member"("addressId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
