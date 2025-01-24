/*
  # Initial Schema Setup

  1. Tables
    - users (managed by Supabase Auth)
    - scripts
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - image_url (text)
      - price (numeric)
      - game_type (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    - purchases
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - script_id (uuid, references scripts)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create scripts table
CREATE TABLE scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  price numeric NOT NULL,
  game_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create purchases table
CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  script_id uuid REFERENCES scripts NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Scripts policies
CREATE POLICY "Anyone can view scripts"
  ON scripts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert scripts"
  ON scripts
  FOR INSERT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update scripts"
  ON scripts
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete scripts"
  ON scripts
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Purchases policies
CREATE POLICY "Users can view their own purchases"
  ON purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create purchases"
  ON purchases
  FOR INSERT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for scripts
CREATE TRIGGER update_scripts_updated_at
  BEFORE UPDATE ON scripts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();