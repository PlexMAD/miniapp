/*
  Warnings:

  - Made the column `configId` on table `games` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."games" DROP CONSTRAINT "games_configId_fkey";

-- AlterTable
ALTER TABLE "games" ALTER COLUMN "configId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_configId_fkey" FOREIGN KEY ("configId") REFERENCES "gameConfigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
