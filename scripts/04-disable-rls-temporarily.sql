-- Temporarily disable RLS on profiles table to fix the recursion issue
-- We'll handle security in the application layer for now

-- Drop all existing policies on profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Coordinators can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Coordinators can delete student profiles" ON profiles;
DROP POLICY IF EXISTS "Lecturers can view students in their groups" ON profiles;

-- Disable RLS on profiles table temporarily
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Keep RLS enabled on other tables with simple policies
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE lecturer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Simple policies for other tables
CREATE POLICY "Authenticated users can view subjects" ON subjects
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view groups" ON groups
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view group memberships" ON group_memberships
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view lecturer assignments" ON lecturer_assignments
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view grades" ON grades
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view payments" ON payments
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view schedules" ON schedules
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (recipient_id = auth.uid());

CREATE POLICY "Authenticated users can create notifications" ON notifications
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view announcements" ON announcements
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- For now, we'll handle all role-based access control in the application layer
-- This ensures the system works without RLS conflicts
