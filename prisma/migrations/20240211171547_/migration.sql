-- DropForeignKey
ALTER TABLE `fazenda` DROP FOREIGN KEY `fazenda_ibfk_1`;

-- DropForeignKey
ALTER TABLE `fazenda` DROP FOREIGN KEY `fazenda_ibfk_2`;

-- AlterTable
ALTER TABLE `fazenda` MODIFY `nome` VARCHAR(40) NOT NULL,
    MODIFY `distrito` VARCHAR(40) NULL,
    MODIFY `bairro` VARCHAR(40) NULL,
    MODIFY `id_proprietario` VARCHAR(36) NOT NULL,
    MODIFY `id_municipio` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `fazenda` ADD CONSTRAINT `fazenda_ibfk_1` FOREIGN KEY (`id_proprietario`) REFERENCES `proprietario`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `fazenda` ADD CONSTRAINT `fazenda_ibfk_2` FOREIGN KEY (`id_municipio`) REFERENCES `municipio`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
