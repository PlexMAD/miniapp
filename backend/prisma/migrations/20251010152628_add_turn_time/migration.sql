/*
  Warnings:

  - You are about to drop the column `timeForACard` on the `gameConfigs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gameConfigs" DROP COLUMN "timeForACard",
ADD COLUMN     "turnTime" INTEGER;
