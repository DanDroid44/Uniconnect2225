-- Function to calculate final average
CREATE OR REPLACE FUNCTION calculate_final_average(
    assignment_1 DECIMAL,
    assignment_2 DECIMAL,
    test_1 DECIMAL,
    test_2 DECIMAL,
    exam DECIMAL
) RETURNS DECIMAL AS $$
BEGIN
    -- Calculate weighted average: Assignments 20%, Tests 30%, Exam 50%
    RETURN ROUND(
        (COALESCE(assignment_1, 0) * 0.1) +
        (COALESCE(assignment_2, 0) * 0.1) +
        (COALESCE(test_1, 0) * 0.15) +
        (COALESCE(test_2, 0) * 0.15) +
        (COALESCE(exam, 0) * 0.5),
        2
    );
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically calculate final average
CREATE OR REPLACE FUNCTION update_final_average()
RETURNS TRIGGER AS $$
BEGIN
    NEW.final_average := calculate_final_average(
        NEW.assignment_1,
        NEW.assignment_2,
        NEW.test_1,
        NEW.test_2,
        NEW.exam
    );
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER grades_calculate_average
    BEFORE INSERT OR UPDATE ON grades
    FOR EACH ROW
    EXECUTE FUNCTION update_final_average();

-- Function to automatically assign student to group
CREATE OR REPLACE FUNCTION assign_student_to_group()
RETURNS TRIGGER AS $$
DECLARE
    group_id_var UUID;
BEGIN
    -- Only for students with faculty and academic_year
    IF NEW.role = 'student' AND NEW.faculty IS NOT NULL AND NEW.academic_year IS NOT NULL THEN
        -- Find the appropriate group
        SELECT id INTO group_id_var
        FROM groups
        WHERE faculty = NEW.faculty AND academic_year = NEW.academic_year
        LIMIT 1;
        
        -- Insert into group_memberships if group found
        IF group_id_var IS NOT NULL THEN
            INSERT INTO group_memberships (group_id, student_id)
            VALUES (group_id_var, NEW.id)
            ON CONFLICT (group_id, student_id) DO NOTHING;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_student_to_group_trigger
    AFTER INSERT OR UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION assign_student_to_group();

-- Function to create monthly payment records for students
CREATE OR REPLACE FUNCTION create_monthly_payments()
RETURNS TRIGGER AS $$
DECLARE
    current_month INTEGER;
    current_year INTEGER;
BEGIN
    -- Only for students
    IF NEW.role = 'student' THEN
        current_month := EXTRACT(MONTH FROM NOW());
        current_year := EXTRACT(YEAR FROM NOW());
        
        -- Create payment record for current month
        INSERT INTO payments (student_id, month, year, status)
        VALUES (NEW.id, current_month, current_year, 'pending')
        ON CONFLICT (student_id, month, year) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_monthly_payments_trigger
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_monthly_payments();
