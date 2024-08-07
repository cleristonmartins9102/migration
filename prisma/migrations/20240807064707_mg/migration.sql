/*
  Warnings:

  - You are about to alter the column `web_parent` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "web_parent" SET DATA TYPE INTEGER;
