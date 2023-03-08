/*
  Warnings:

  - Made the column `frotaId` on table `manutencao` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `manutencao` DROP FOREIGN KEY `Manutencao_frotaId_fkey`;

-- AlterTable
ALTER TABLE `manutencao` MODIFY `frotaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Manutencao` ADD CONSTRAINT `Manutencao_frotaId_fkey` FOREIGN KEY (`frotaId`) REFERENCES `Frota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
