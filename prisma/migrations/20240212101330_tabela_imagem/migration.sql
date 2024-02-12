/*
  Warnings:

  - You are about to drop the column `foto` on the `fazenda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fazenda` DROP COLUMN `foto`;

-- CreateTable
CREATE TABLE `Imagem` (
    `id` VARCHAR(36) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `id_fazenda` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `Imagem_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Imagem` ADD CONSTRAINT `Imagem_id_fazenda_fkey` FOREIGN KEY (`id_fazenda`) REFERENCES `fazenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
