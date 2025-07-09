-- Final cleanup script to ensure profile integrity
-- This version handles foreign key dependencies properly

-- 1. First, let's see what we're working with
SELECT 
  'Current profile count' as info,
  COUNT(*) as value
FROM profiles
UNION ALL
SELECT 
  'Duplicate profiles' as info,
  COUNT(*) as value
FROM (
  SELECT id, COUNT(*) as cnt
  FROM profiles
  GROUP BY id
  HAVING COUNT(*) > 1
) duplicates;

-- 2. Remove duplicate profiles without touching constraints
-- Keep the oldest profile for each user ID
WITH ranked_profiles AS (
  SELECT 
    id,
    email,
    username,
    full_name,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY id ORDER BY created_at ASC) as rn
  FROM profiles
),
profiles_to_delete AS (
  SELECT id, created_at
  FROM ranked_profiles 
  WHERE rn > 1
)
DELETE FROM profiles 
WHERE (id, created_at) IN (
  SELECT id, created_at FROM profiles_to_delete
);

-- 3. Fix any username conflicts that might exist after cleanup
-- Add a suffix to duplicate usernames
WITH duplicate_usernames AS (
  SELECT 
    id,
    username,
    ROW_NUMBER() OVER (PARTITION BY username ORDER BY created_at ASC) as rn
  FROM profiles
  WHERE username IN (
    SELECT username 
    FROM profiles 
    GROUP BY username 
    HAVING COUNT(*) > 1
  )
)
UPDATE profiles 
SET username = username || '_' || (duplicate_usernames.rn - 1)
FROM duplicate_usernames
WHERE profiles.id = duplicate_usernames.id 
  AND duplicate_usernames.rn > 1;

-- 4. Fix any email conflicts that might exist after cleanup
WITH duplicate_emails AS (
  SELECT 
    id,
    email,
    ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC) as rn
  FROM profiles
  WHERE email IN (
    SELECT email 
    FROM profiles 
    GROUP BY email 
    HAVING COUNT(*) > 1
  )
)
UPDATE profiles 
SET email = SPLIT_PART(email, '@', 1) || '_' || (duplicate_emails.rn - 1) || '@' || SPLIT_PART(email, '@', 2)
FROM duplicate_emails
WHERE profiles.id = duplicate_emails.id 
  AND duplicate_emails.rn > 1;

-- 5. Add unique constraints only if they don't exist
DO $$ 
BEGIN
    -- Add unique constraint on username if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_username_key' 
        AND conrelid = 'profiles'::regclass
    ) THEN
        ALTER TABLE profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
    END IF;

    -- Add unique constraint on email if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_email_key' 
        AND conrelid = 'profiles'::regclass
    ) THEN
        ALTER TABLE profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
    END IF;
END $$;

-- 6. Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_faculty_year ON profiles(faculty, academic_year);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 7. Show final status
SELECT 
  'Final profile count' as metric,
  COUNT(*) as count
FROM profiles
UNION ALL
SELECT 
  'Profiles by role: ' || role as metric,
  COUNT(*) as count
FROM profiles
GROUP BY role
UNION ALL
SELECT 
  'Remaining duplicates (should be 0)' as metric,
  COUNT(*) as count
FROM (
  SELECT id, COUNT(*) as cnt
  FROM profiles
  GROUP BY id
  HAVING COUNT(*) > 1
) duplicates
UNION ALL
SELECT 
  'Username conflicts (should be 0)' as metric,
  COUNT(*) as count
FROM (
  SELECT username, COUNT(*) as cnt
  FROM profiles
  GROUP BY username
  HAVING COUNT(*) > 1
) username_conflicts
UNION ALL
SELECT 
  'Email conflicts (should be 0)' as metric,
  COUNT(*) as count
FROM (
  SELECT email, COUNT(*) as cnt
  FROM profiles
  GROUP BY email
  HAVING COUNT(*) > 1
) email_conflicts;
