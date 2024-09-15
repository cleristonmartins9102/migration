/*
  Warnings:

  - You are about to drop the column `web_parent_id` on the `Member` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_web_parent_id_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "web_parent_id",
ADD COLUMN     "web_parent" INTEGER;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_web_parent_fkey" FOREIGN KEY ("web_parent") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
