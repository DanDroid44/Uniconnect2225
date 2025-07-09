-- Clean up all existing policies first, then set up fresh ones
-- This prevents "already exists" errors

-- Drop all existing policies on all tables
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on profiles
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON profiles';
    END LOOP;
    
    -- Drop all policies on subjects
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'subjects') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON subjects';
    END LOOP;
    
    -- Drop all policies on groups
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'groups') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON groups';
    END LOOP;
    
    -- Drop all policies on group_memberships
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'group_memberships') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON group_memberships';
    END LOOP;
    
    -- Drop all policies on lecturer_assignments
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'lecturer_assignments') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON lecturer_assignments';
    END LOOP;
    
    -- Drop all policies on grades
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'grades') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON grades';
    END LOOP;
    
    -- Drop all policies on payments
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'payments') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON payments';
    END LOOP;
    
    -- Drop all policies on schedules
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'schedules') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON schedules';
    END LOOP;
    
    -- Drop all policies on notifications
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'notifications') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON notifications';
    END LOOP;
    
    -- Drop all policies on announcements
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'announcements') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON announcements';
    END LOOP;
END $$;

-- Drop any existing functions that might cause issues
DROP FUNCTION IF EXISTS auth.user_role();

-- Disable RLS on profiles table to prevent recursion
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Enable RLS on other tables
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE lecturer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create simple, safe policies for other tables
CREATE POLICY "authenticated_users_can_view_subjects" ON subjects
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_view_groups" ON groups
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_view_group_memberships" ON group_memberships
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_view_lecturer_assignments" ON lecturer_assignments
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_view_grades" ON grades
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_view_payments" ON payments
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_view_schedules" ON schedules
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "users_can_view_own_notifications" ON notifications
    FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "users_can_update_own_notifications" ON notifications
    FOR UPDATE USING (recipient_id = auth.uid());

CREATE POLICY "authenticated_users_can_create_notifications" ON notifications
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_view_announcements" ON announcements
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- Grant necessary permissions for authenticated users to manage data
-- (We'll handle role-based restrictions in the application layer)
CREATE POLICY "authenticated_users_can_manage_subjects" ON subjects
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_manage_groups" ON groups
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_manage_group_memberships" ON group_memberships
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_manage_lecturer_assignments" ON lecturer_assignments
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_manage_grades" ON grades
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_manage_payments" ON payments
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_manage_schedules" ON schedules
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_users_can_manage_announcements" ON announcements
    FOR ALL USING (auth.uid() IS NOT NULL);
