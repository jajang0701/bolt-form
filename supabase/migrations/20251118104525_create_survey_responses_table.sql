/*
  # Create Survey Responses Table

  1. New Tables
    - `survey_responses`
      - `id` (uuid, primary key) - Unique identifier for each response
      - `user_id` (uuid, foreign key) - Reference to authenticated user
      - `user_email` (text) - Email of the respondent
      - `responses` (jsonb) - JSON object containing all survey answers
      - `created_at` (timestamptz) - Timestamp when survey was submitted
      
  2. Security
    - Enable RLS on `survey_responses` table
    - Add policy for authenticated users to insert their own responses
    - Add policy for authenticated users to view their own responses
*/

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  user_email text NOT NULL,
  responses jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own survey responses"
  ON survey_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own survey responses"
  ON survey_responses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);