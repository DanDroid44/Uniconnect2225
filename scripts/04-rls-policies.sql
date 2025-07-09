-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE lecturer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Profiles policies (fixed to avoid recursion)
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create a function to check user role to avoid recursion
CREATE OR REPLACE FUNCTION auth.user_role() RETURNS TEXT AS $$
  SELECT role::TEXT FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER;

-- Coordinators can view all profiles (using function to avoid recursion)
CREATE POLICY "Coordinators can view all profiles" ON profiles
    FOR SELECT USING (auth.user_role() = 'coordinator');

CREATE POLICY "Coordinators can delete student profiles" ON profiles
    FOR DELETE USING (
        auth.user_role() = 'coordinator' AND role = 'student'
    );

-- Lecturers can view students in their groups
CREATE POLICY "Lecturers can view students in their groups" ON profiles
    FOR SELECT USING (
        role = 'student' AND EXISTS (
            SELECT 1 FROM lecturer_assignments la
            JOIN group_memberships gm ON la.group_id = gm.group_id
            WHERE la.lecturer_id = auth.uid() AND gm.student_id = profiles.id
        )
    );

-- Subjects policies
CREATE POLICY "Everyone can view subjects" ON subjects FOR SELECT USING (true);

CREATE POLICY "Coordinators can manage subjects" ON subjects
    FOR ALL USING (auth.user_role() = 'coordinator');

-- Groups policies
CREATE POLICY "Everyone can view groups" ON groups FOR SELECT USING (true);

CREATE POLICY "Coordinators can manage groups" ON groups
    FOR ALL USING (auth.user_role() = 'coordinator');

-- Group memberships policies
CREATE POLICY "Students can view their group memberships" ON group_memberships
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Lecturers can view their group memberships" ON group_memberships
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lecturer_assignments 
            WHERE lecturer_id = auth.uid() AND group_id = group_memberships.group_id
        )
    );

CREATE POLICY "Coordinators can manage group memberships" ON group_memberships
    FOR ALL USING (auth.user_role() = 'coordinator');

-- Lecturer assignments policies
CREATE POLICY "Lecturers can view their assignments" ON lecturer_assignments
    FOR SELECT USING (lecturer_id = auth.uid());

CREATE POLICY "Coordinators can manage lecturer assignments" ON lecturer_assignments
    FOR ALL USING (auth.user_role() = 'coordinator');

-- Grades policies
CREATE POLICY "Students can view their own grades" ON grades
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Lecturers can manage grades for their subjects" ON grades
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM lecturer_assignments la
            JOIN group_memberships gm ON la.group_id = gm.group_id
            WHERE la.lecturer_id = auth.uid() 
            AND la.subject_id = grades.subject_id 
            AND gm.student_id = grades.student_id
        )
    );

CREATE POLICY "Coordinators can view all grades" ON grades
    FOR SELECT USING (auth.user_role() = 'coordinator');

-- Payments policies
CREATE POLICY "Students can view their own payments" ON payments
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Coordinators can manage all payments" ON payments
    FOR ALL USING (auth.user_role() = 'coordinator');

-- Schedules policies
CREATE POLICY "Students can view schedules for their groups" ON schedules
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_memberships 
            WHERE student_id = auth.uid() AND group_id = schedules.group_id
        )
    );

CREATE POLICY "Lecturers can view and manage their schedules" ON schedules
    FOR ALL USING (lecturer_id = auth.uid());

CREATE POLICY "Coordinators can manage all schedules" ON schedules
    FOR ALL USING (auth.user_role() = 'coordinator');

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (recipient_id = auth.uid());

CREATE POLICY "Coordinators and lecturers can create notifications" ON notifications
    FOR INSERT WITH CHECK (
        auth.user_role() IN ('coordinator', 'lecturer')
    );

-- Announcements policies
CREATE POLICY "Students can view announcements for their groups" ON announcements
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_memberships 
            WHERE student_id = auth.uid() AND group_id = announcements.group_id
        )
    );

CREATE POLICY "Lecturers can manage their announcements" ON announcements
    FOR ALL USING (lecturer_id = auth.uid());

CREATE POLICY "Coordinators can view all announcements" ON announcements
    FOR SELECT USING (auth.user_role() = 'coordinator');
