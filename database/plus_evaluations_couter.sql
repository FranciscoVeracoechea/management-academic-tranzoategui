DELIMITER $$
CREATE TRIGGER plus_evaluations_couter AFTER INSERT ON
    evaluations FOR EACH ROW
BEGIN
      UPDATE school_subjects SET evaluations_number = evaluations_number + 1 WHERE id = NEW.school_subjects_id;
END; $$
DELIMITER ;