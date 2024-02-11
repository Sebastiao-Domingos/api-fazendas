/*
  Warnings:

  - The primary key for the `fazenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `municipio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `proprietario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `provincia` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `fazenda` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `municipio` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `proprietario` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `provincia` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);
