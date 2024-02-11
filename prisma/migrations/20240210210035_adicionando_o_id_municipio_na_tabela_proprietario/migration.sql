/*
  Warnings:

  - Added the required column `id_municipio` to the `proprietario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proprietario` ADD COLUMN `id_municipio` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `proprietario` ADD CONSTRAINT `municipio_ibfk_2` FOREIGN KEY (`id_municipio`) REFERENCES `municipio`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
