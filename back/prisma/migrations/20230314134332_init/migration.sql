-- AlterTable
ALTER TABLE `frota` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `motorista` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;
