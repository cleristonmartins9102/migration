/*
  Warnings:

  - A unique constraint covering the columns `[source_record_id]` on the table `Audit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Audit_source_record_id_key" ON "Audit"("source_record_id");
