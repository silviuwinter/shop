-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `processor` VARCHAR(191) NOT NULL,
    `ram` INTEGER NOT NULL,
    `storage` INTEGER NOT NULL,
    `webcam` BOOLEAN NOT NULL,
    `microphone` BOOLEAN NOT NULL,
    `price` DOUBLE NOT NULL,

    UNIQUE INDEX `Product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
