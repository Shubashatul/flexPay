/*
  Warnings:

  - A unique constraint covering the columns `[WalletPin]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_WalletPin_key" ON "User"("WalletPin");
