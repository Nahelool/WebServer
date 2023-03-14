CREATE TABLE `dogGardenTime`(
    `id` BIGINT PRIMARY KEY  NOT NULL,
    `gardenEntrance` TIMESTAMP,
    `gardenExit` TIMESTAMP
);

CREATE TABLE `dogCellTime`(
    `id` BIGINT PRIMARY KEY  NOT NULL,
    `cellEntrance` TIMESTAMP ,
    `cellExit` TIMESTAMP 
);

CREATE TABLE `Dog`(
    `id` BIGINT PRIMARY KEY  NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `color` INT NOT NULL,
    `cellNum` INT NOT NULL
);


CREATE TABLE `Volenteer`(
    `id` BIGINT PRIMARY KEY  NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `color` INT NOT NULL,
    `email` VARCHAR(255) NOT NULL
);

CREATE TABLE `notValidDogComb`(
    `id` BIGINT PRIMARY KEY  NOT NULL ,
    `noNoDogs` JSON
);

ALTER TABLE
    `dogGardenTime` ADD CONSTRAINT `doggardentime_id_foreign` FOREIGN KEY(`id`) REFERENCES `Dog`(`id`);
ALTER TABLE
    `dogCellTime` ADD CONSTRAINT `dogcelltime_id_foreign` FOREIGN KEY(`id`) REFERENCES `Dog`(`id`);
ALTER TABLE
    `notValidDogComb` ADD CONSTRAINT `notvaliddogcomb_id_foreign` FOREIGN KEY(`id`) REFERENCES `Dog`(`id`);