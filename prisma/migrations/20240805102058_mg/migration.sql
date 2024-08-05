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
    "payroll_number" DECIMAL(65,30) NOT NULL,
    "role" TEXT NOT NULL,
    "web_parent" DECIMAL(65,30) NOT NULL,
    "settings" JSONB NOT NULL,
    "contact" JSONB NOT NULL,
    "branch" JSONB NOT NULL,
    "wallet" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "shop" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_user_account_id_key" ON "Members"("user_account_id");
