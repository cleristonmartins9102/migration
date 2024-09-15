-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "user_account_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "customer_type" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT true,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "internal_id" TEXT NOT NULL,
    "invoiced_by" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "web_parent" INTEGER NOT NULL,
    "branch" JSONB NOT NULL,
    "payroll_number" INTEGER NOT NULL DEFAULT 0,
    "shop_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "memberId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "can_deliver" BOOLEAN NOT NULL,
    "delivery_day" TEXT[],
    "fcm_tokens" TEXT[],
    "push_asked" BOOLEAN NOT NULL,
    "marketing_email" BOOLEAN NOT NULL,
    "marketing_push" BOOLEAN NOT NULL,
    "marketing_sms" BOOLEAN NOT NULL,
    "transactional_email" BOOLEAN NOT NULL,
    "transactional_push" BOOLEAN NOT NULL,
    "transactional_sms" BOOLEAN NOT NULL,
    "memberId" INTEGER,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Member_user_account_id_key" ON "Member"("user_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_internal_id_key" ON "Member"("internal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_memberId_key" ON "Location"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_memberId_key" ON "Settings"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_memberId_key" ON "Wallet"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_memberId_key" ON "Contact"("memberId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
