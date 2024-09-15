-- CreateTable
CREATE TABLE "Audit" (
    "id" SERIAL NOT NULL,
    "operation_type" TEXT NOT NULL,
    "source_record_id" TEXT NOT NULL,
    "target_record_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "error_message" TEXT NOT NULL,
    "source_table_name" TEXT NOT NULL,
    "operation_details" JSONB NOT NULL,
    "performed_by" TEXT NOT NULL,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);
