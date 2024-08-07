/*
  Warnings:

  - You are about to drop the column `settings` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "settings";

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "can_deliver" BOOLEAN NOT NULL,
    "delivery_day" TEXT[],
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

-- CreateIndex
CREATE UNIQUE INDEX "Settings_memberId_key" ON "Settings"("memberId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
