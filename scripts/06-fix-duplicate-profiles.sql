-- Fix duplicate profiles issue
-- This script will identify and clean up any duplicate profiles

-- First, let's see if there are any duplicate profiles
SELECT id, email, username, COUNT(*) as count
FROM profiles 
GROUP BY id, email, username
HAVING COUNT(*) > 1;

-- Remove any duplicate profiles (keep the first one created)
WITH duplicates AS (
  SELECT id, 
         ROW_NUMBER() OVER (PARTITION BY id ORDER BY created_at ASC) as rn
  FROM profiles
)
DELETE FROM profiles 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Add a unique constraint on id to prevent future duplicates (if not already exists)
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_unique;
ALTER TABLE profiles ADD CONSTRAINT profiles_id_unique UNIQUE (id);

-- Also ensure username is unique
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_username_unique;
ALTER TABLE profiles ADD CONSTRAINT profiles_username_unique UNIQUE (username);

-- Check for any orphaned auth users without profiles
SELECT auth.users.id, auth.users.email
FROM auth.users
LEFT JOIN public.profiles ON auth.users.id = public.profiles.id
WHERE public.profiles.id IS NULL;

-- Clean up any test data or incomplete registrations if needed
-- (Uncomment the following lines if you want to remove users without profiles)
-- DELETE FROM auth.users 
-- WHERE id NOT IN (SELECT id FROM public.profiles);
