-- DropForeignKey
ALTER TABLE `municipio` DROP FOREIGN KEY `municipio_ibfk_1`;

-- AlterTable
ALTER TABLE `municipio` MODIFY `id_provincia` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `municipio` ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`id_provincia`) REFERENCES `provincia`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
