/*
  Warnings:

  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Members";

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "user_account_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "customer_type" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL,
    "email_verified" BOOLEAN NOT NULL,
    "internal_id" TEXT NOT NULL,
    "invoiced_by" TEXT NOT NULL,
    "payroll_number" DECIMAL(65,30) NOT NULL,
    "role" TEXT NOT NULL,
    "web_parent" DECIMAL(65,30) NOT NULL,
    "settings" JSONB NOT NULL,
    "contact" JSONB NOT NULL,
    "branch" JSONB NOT NULL,
    "wallet" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "shop" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_user_account_id_key" ON "members"("user_account_id");
