-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_memberId_fkey";

-- DropForeignKey
ALTER TABLE "MemberHouseHold" DROP CONSTRAINT "MemberHouseHold_memberId_fkey";

-- DropForeignKey
ALTER TABLE "MemberShop" DROP CONSTRAINT "MemberShop_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_memberId_fkey";

-- AddForeignKey
ALTER TABLE "MemberHouseHold" ADD CONSTRAINT "MemberHouseHold_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberShop" ADD CONSTRAINT "MemberShop_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
