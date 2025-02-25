/*
  Warnings:

  - A unique constraint covering the columns `[UpiId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_WalletPin_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_UpiId_key" ON "User"("UpiId");
