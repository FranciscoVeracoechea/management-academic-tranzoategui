CREATE DATABASE IF NOT EXISTS gestion_academica_tranzoategui DEFAULT CHARACTER SET utf8; USE
    gestion_academica_tranzoategui;

CREATE TABLE users(
    `id` BIGINT NOT NULL UNIQUE AUTO_INCREMENT,
    `ci` VARCHAR(25) NOT NULL UNIQUE,
    `fullname` VARCHAR(108) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(200) NOT NULL UNIQUE,
    `role` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL,
    `age` INT NOT NULL DEFAULT '18',
    `direction` VARCHAR(255) NOT NULL,
    `biography` TEXT,
    `status` ENUM('ACTIVE', 'BLOKED') DEFAULT 'ACTIVE',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
); 
CREATE TABLE school_subjects(
    `id` BIGINT NOT NULL UNIQUE AUTO_INCREMENT,
    `name` VARCHAR(68) NOT NULL UNIQUE,
    `description` TEXT,
    `evaluations_number` INT NOT NULL DEFAULT '8',
    `teachers_count` INT NOT NULL DEFAULT '0',
    `students_count` INT NOT NULL DEFAULT '0',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
); 
CREATE TABLE school_subjects__users(
    `id` BIGINT NOT NULL UNIQUE AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `school_subjects_id` BIGINT NOT NULL,
    `final_score` DECIMAL(6, 4),
    `completed` ENUM('TRUE', 'FALSE') DEFAULT 'TRUE',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(`school_subjects_id`) REFERENCES `school_subjects`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
); 
CREATE TABLE evaluations(
    `id` BIGINT NOT NULL UNIQUE AUTO_INCREMENT,
    `school_subjects_id` BIGINT NOT NULL,
    `student_id` BIGINT NOT NULL,
    `description` TEXT,
    `qualification` DECIMAL(6, 4),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(`student_id`) REFERENCES `users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(`school_subjects_id`) REFERENCES `school_subjects`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE notices(
    `id` BIGINT NOT NULL UNIQUE AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `type` VARCHAR(68),
    `image` LONGTEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

------------    TRIGGERS    ---------------------
-- minus_user_counters
DELIMITER $$
CREATE TRIGGER minus_user_counters AFTER DELETE ON 
    school_subjects__users FOR EACH ROW
BEGIN
    DECLARE user_role VARCHAR(255);

    SET user_role = (SELECT role FROM users WHERE id = OLD.user_id);

    IF user_role = "TEACHER" THEN
        UPDATE school_subjects SET teachers_count = teachers_count - 1 WHERE id = OLD.school_subjects_id;
    ELSEIF user_role = "STUDENT" THEN
        UPDATE school_subjects SET students_count = students_count - 1 WHERE id = OLD.school_subjects_id;
    END IF;

END; $$
DELIMITER ;


-- plus_user_counters
DELIMITER $$
CREATE TRIGGER plus_user_counters AFTER INSERT ON
    school_subjects__users FOR EACH ROW
BEGIN
    DECLARE user_role VARCHAR(255);

    SET user_role = (SELECT role FROM users WHERE id = NEW.user_id);

    IF user_role = "TEACHER" THEN
        UPDATE school_subjects SET teachers_count = teachers_count + 1 WHERE id = NEW.school_subjects_id;
    ELSEIF user_role = "STUDENT" THEN
        UPDATE school_subjects SET students_count = students_count + 1 WHERE id = NEW.school_subjects_id;
    END IF;

END; $$
DELIMITER ;


-- minus_evaluations_couter
-- DELIMITER $$
-- CREATE TRIGGER minus_evaluations_couter AFTER DELETE ON
--     evaluations FOR EACH ROW
-- BEGIN
--         UPDATE school_subjects SET evaluations_number = evaluations_number - 1 WHERE id = OLD.school_subjects_id;
-- END; $$
-- DELIMITER ;


-- -- plus_evaluations_couter
-- DELIMITER $$
-- CREATE TRIGGER plus_evaluations_couter AFTER INSERT ON
--     evaluations FOR EACH ROW
-- BEGIN
--         UPDATE school_subjects SET evaluations_number = evaluations_number + 1 WHERE id = NEW.school_subjects_id;
-- END; $$
-- DELIMITER ;