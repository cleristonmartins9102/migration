-- AlterTable
ALTER TABLE "Audit" ALTER COLUMN "error_message" DROP NOT NULL,
ALTER COLUMN "target_record_id" DROP NOT NULL;
