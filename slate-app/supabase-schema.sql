-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- 1. Create the analyses table
CREATE TABLE analyses (
  id UUID PRIMARY KEY,
  input_text TEXT NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (required by Supabase)
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to INSERT (no auth needed)
CREATE POLICY "Allow public inserts"
  ON analyses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Allow anyone to SELECT (for shareable links)
CREATE POLICY "Allow public reads"
  ON analyses
  FOR SELECT
  TO anon
  USING (true);

-- 5. Optional: create index on created_at for faster queries
CREATE INDEX idx_analyses_created_at ON analyses (created_at DESC);
