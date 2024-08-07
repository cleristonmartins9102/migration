/*
  Warnings:

  - You are about to alter the column `payroll_number` on the `members` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "members" ALTER COLUMN "payroll_number" SET DATA TYPE INTEGER;
