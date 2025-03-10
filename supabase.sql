-- Create table users
CREATE TABLE public.users (
  id uuid not null references auth.users on delete cascade,
  full_name text NULL,
  email text NULL,
  username text UNIQUE,
  avatar_url text NULL,
  participation text DEFAULT 'not enrolled',
  area text NULL,
  technology text NULL,
  project_name text NULL,
  selected_duration integer NULL,
  start_date date NULL,
  end_date date NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  primary key (id)
);

-- Function for User from OAuth to Users Table
CREATE OR REPLACE FUNCTION public.user_profile()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (
    id,
    full_name,
    email,
    username,
    avatar_url,
    participation,
    area,
    technology,
    project_name,
    selected_duration,
    start_date,
    end_date,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'email',
    NEW.raw_user_meta_data ->> 'user_name',
    NEW.raw_user_meta_data->>'avatar_url',
    'not enrolled',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    now(),
    now()
  );
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to Create User in Users Table
CREATE TRIGGER
create_user_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE
  public.user_profile();

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies for Users Table
CREATE POLICY "Permit Users to Access Their Profile"
  ON public.users
  FOR SELECT
  USING ( auth.uid() = id );

-- Users can only view their own profile
CREATE POLICY "Permit Users to Update Their Profile"
  ON public.users
  FOR UPDATE
  USING ( auth.uid() = id );

-- Drop users table if needed
DROP TABLE IF EXISTS public.users CASCADE;

-- Drop trigger if needed
DROP TRIGGER IF EXISTS create_user_trigger ON auth.users;
