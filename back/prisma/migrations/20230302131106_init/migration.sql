/*
  Warnings:

  - You are about to drop the column `servicoId` on the `frota` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `frota` DROP FOREIGN KEY `Frota_servicoId_fkey`;

-- AlterTable
ALTER TABLE `frota` DROP COLUMN `servicoId`;

-- AlterTable
ALTER TABLE `servico` ADD COLUMN `frotaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_frotaId_fkey` FOREIGN KEY (`frotaId`) REFERENCES `Frota`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
