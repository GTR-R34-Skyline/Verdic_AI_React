/*
  # Initial Schema Setup for Verdic AI

  1. New Tables
    - `users` - Extended user profile information
    - `documents` - Legal document templates and generated documents
    - `cases` - Case management information
    - `precedents` - Legal precedent database
    - `document_types` - Types of legal documents that can be generated

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Document Types
CREATE TABLE document_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  template text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE document_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Document types are viewable by authenticated users"
  ON document_types
  FOR SELECT
  TO authenticated
  USING (true);

-- Documents
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type_id uuid REFERENCES document_types(id),
  title text NOT NULL,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own documents"
  ON documents
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Cases
CREATE TABLE cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  case_number text NOT NULL,
  client_name text NOT NULL,
  type text NOT NULL,
  status text NOT NULL,
  due_date date,
  description text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own cases"
  ON cases
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Precedents
CREATE TABLE precedents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  court text NOT NULL,
  date date NOT NULL,
  category text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  citations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE precedents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Precedents are viewable by authenticated users"
  ON precedents
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert some initial document types
INSERT INTO document_types (name, description, template) VALUES
  ('Contract Agreement', 'Standard contract agreement template', 'This Agreement is made on [DATE] between [PARTY1] and [PARTY2]...'),
  ('Legal Notice', 'Legal notice template', 'NOTICE TO [RECIPIENT]...'),
  ('Court Filing', 'Court filing document template', 'IN THE COURT OF [JURISDICTION]...'),
  ('Settlement Agreement', 'Settlement agreement template', 'This Settlement Agreement is made between [PARTY1] and [PARTY2]...'),
  ('Power of Attorney', 'Power of attorney document template', 'KNOW ALL MEN BY THESE PRESENTS: That I, [NAME]...');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_document_types_updated_at
    BEFORE UPDATE ON document_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();