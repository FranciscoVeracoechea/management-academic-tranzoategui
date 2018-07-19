DELIMITER $$
CREATE TRIGGER minus_evaluations_couter AFTER DELETE ON
    evaluations FOR EACH ROW
BEGIN
      UPDATE school_subjects SET evaluations_number = evaluations_number - 1 WHERE id = OLD.school_subjects_id;
END; $$
DELIMITER ;