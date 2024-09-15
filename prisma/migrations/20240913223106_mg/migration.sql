/*
  Warnings:

  - A unique constraint covering the columns `[internal_id]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_internal_id_key" ON "Member"("internal_id");
