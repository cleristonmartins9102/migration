/*
  Warnings:

  - Changed the type of `target_record_id` on the `Audit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Audit" DROP COLUMN "target_record_id",
ADD COLUMN     "target_record_id" INTEGER NOT NULL;
