-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Coordinators can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Coordinators can delete student profiles" ON profiles;
DROP POLICY IF EXISTS "Lecturers can view students in their groups" ON profiles;

-- Drop the function that was causing issues
DROP FUNCTION IF EXISTS auth.user_role();

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

-- Simple profiles policies (no recursion)
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- For now, we'll handle role-based access in the application layer
-- These policies allow basic operations and we'll add role checks in the app

-- Subjects policies - allow everyone to read, restrict writes to app logic
CREATE POLICY "Everyone can view subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage subjects" ON subjects
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Groups policies
CREATE POLICY "Everyone can view groups" ON groups FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage groups" ON groups
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Group memberships policies
CREATE POLICY "Users can view group memberships" ON group_memberships
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage group memberships" ON group_memberships
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Lecturer assignments policies
CREATE POLICY "Users can view lecturer assignments" ON lecturer_assignments
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage lecturer assignments" ON lecturer_assignments
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Grades policies
CREATE POLICY "Users can view grades" ON grades
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage grades" ON grades
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Payments policies
CREATE POLICY "Users can view payments" ON payments
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage payments" ON payments
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Schedules policies
CREATE POLICY "Users can view schedules" ON schedules
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage schedules" ON schedules
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (recipient_id = auth.uid());

CREATE POLICY "Authenticated users can create notifications" ON notifications
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Announcements policies
CREATE POLICY "Users can view announcements" ON announcements
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage announcements" ON announcements
    FOR ALL USING (auth.uid() IS NOT NULL);
