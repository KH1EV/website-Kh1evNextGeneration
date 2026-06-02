-- Run this in the Supabase SQL Editor

-- 1. Create a custom ENUM type for roles (optional, but good for safety)
-- CREATE TYPE admin_role AS ENUM ('Head Admin', 'Admin', 'Developer');

-- 2. Add the role column to admin_users table
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'Admin';

-- 3. Update the specific Discord ID to have 'Head Admin' role
UPDATE admin_users 
SET role = 'Head Admin' 
WHERE discord_id = '494169184175915019';

-- 4. Set a constraint if you want to ensure only these 3 roles are allowed
ALTER TABLE admin_users
ADD CONSTRAINT chk_admin_roles CHECK (role IN ('Head Admin', 'Admin', 'Developer'));
