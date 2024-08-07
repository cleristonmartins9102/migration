/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_memberId_fkey";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "disabled" SET DEFAULT true,
ALTER COLUMN "email_verified" SET DEFAULT false;

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "memberId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_memberId_key" ON "Location"("memberId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
