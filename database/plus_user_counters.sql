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