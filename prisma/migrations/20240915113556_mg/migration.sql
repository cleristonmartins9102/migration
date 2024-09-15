-- CreateTable
CREATE TABLE "FirebaseMigration" (
    "id" SERIAL NOT NULL,
    "enable_create_record" TEXT NOT NULL,
    "enable_update_record" TEXT NOT NULL,

    CONSTRAINT "FirebaseMigration_pkey" PRIMARY KEY ("id")
);
