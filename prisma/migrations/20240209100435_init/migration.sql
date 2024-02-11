-- CreateTable
CREATE TABLE `administrador` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(30) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `senha` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `nome`(`nome`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fazenda` (
    `id` VARCHAR(30) NOT NULL,
    `codigo` VARCHAR(20) NOT NULL,
    `nome` VARCHAR(30) NOT NULL,
    `distrito` VARCHAR(30) NULL,
    `bairro` VARCHAR(30) NULL,
    `foto` BLOB NOT NULL,
    `id_proprietario` VARCHAR(30) NOT NULL,
    `id_municipio` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `codigo`(`codigo`),
    INDEX `id_municipio`(`id_municipio`),
    INDEX `id_proprietario`(`id_proprietario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `municipio` (
    `id` VARCHAR(30) NOT NULL,
    `nome` VARCHAR(30) NOT NULL,
    `id_provincia` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `nome`(`nome`),
    INDEX `id_provincia`(`id_provincia`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proprietario` (
    `id` VARCHAR(30) NOT NULL,
    `nome` VARCHAR(30) NOT NULL,
    `nif` VARCHAR(30) NOT NULL,
    `distrito` VARCHAR(30) NOT NULL,
    `bairro` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `nome`(`nome`),
    UNIQUE INDEX `nif`(`nif`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provincia` (
    `id` VARCHAR(30) NOT NULL,
    `nome` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `nome`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fazenda` ADD CONSTRAINT `fazenda_ibfk_1` FOREIGN KEY (`id_proprietario`) REFERENCES `proprietario`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `fazenda` ADD CONSTRAINT `fazenda_ibfk_2` FOREIGN KEY (`id_municipio`) REFERENCES `municipio`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `municipio` ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`id_provincia`) REFERENCES `provincia`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
