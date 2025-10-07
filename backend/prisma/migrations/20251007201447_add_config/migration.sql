-- AlterTable
ALTER TABLE "games" ADD COLUMN     "configId" INTEGER;

-- CreateTable
CREATE TABLE "gameConfigs" (
    "id" SERIAL NOT NULL,
    "cardSelection" TEXT NOT NULL,

    CONSTRAINT "gameConfigs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_configId_fkey" FOREIGN KEY ("configId") REFERENCES "gameConfigs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
