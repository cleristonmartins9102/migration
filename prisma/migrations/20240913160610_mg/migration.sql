/*
  Warnings:

  - You are about to drop the column `web_parent` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "web_parent",
ADD COLUMN     "web_parent_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_web_parent_id_fkey" FOREIGN KEY ("web_parent_id") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
