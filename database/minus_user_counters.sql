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