-- Final cleanup script to ensure profile integrity

-- 1. Remove any duplicate profiles (keep the oldest one)
WITH ranked_profiles AS (
  SELECT 
    id,
    email,
    username,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY id ORDER BY created_at ASC) as rn
  FROM profiles
)
DELETE FROM profiles 
WHERE (id, created_at) IN (
  SELECT id, created_at 
  FROM ranked_profiles 
  WHERE rn > 1
);

-- 2. Ensure all constraints are in place
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_pkey;
ALTER TABLE profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_username_key;
ALTER TABLE profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_email_key;
ALTER TABLE profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);

-- 3. Add foreign key constraint to ensure profile.id matches auth.users.id
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 4. Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_faculty_year ON profiles(faculty, academic_year);

-- 5. Show current profile status
SELECT 
  'Total profiles' as metric,
  COUNT(*) as count
FROM profiles
UNION ALL
SELECT 
  'Profiles by role' as metric,
  COUNT(*) as count
FROM profiles
GROUP BY role
UNION ALL
SELECT 
  'Duplicate check' as metric,
  COUNT(*) as count
FROM (
  SELECT id, COUNT(*) as cnt
  FROM profiles
  GROUP BY id
  HAVING COUNT(*) > 1
) duplicates;
