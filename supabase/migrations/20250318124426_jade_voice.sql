-- Create database
CREATE DATABASE IF NOT EXISTS verdic_ai;
USE verdic_ai;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Document types table
CREATE TABLE IF NOT EXISTS document_types (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  type_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  metadata JSON DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (type_id) REFERENCES document_types(id)
);

-- Cases table
CREATE TABLE IF NOT EXISTS cases (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  case_number VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  due_date DATE,
  description TEXT,
  metadata JSON DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Precedents table
CREATE TABLE IF NOT EXISTS precedents (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  court VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  category VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  citations JSON DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial document types
INSERT INTO document_types (id, name, description, template) VALUES
  (UUID(), 'Contract Agreement', 'Standard contract agreement template', 'This Agreement is made on [DATE] between [PARTY1] and [PARTY2]...'),
  (UUID(), 'Legal Notice', 'Legal notice template', 'NOTICE TO [RECIPIENT]...'),
  (UUID(), 'Court Filing', 'Court filing document template', 'IN THE COURT OF [JURISDICTION]...'),
  (UUID(), 'Settlement Agreement', 'Settlement agreement template', 'This Settlement Agreement is made between [PARTY1] and [PARTY2]...'),
  (UUID(), 'Power of Attorney', 'Power of attorney document template', 'KNOW ALL MEN BY THESE PRESENTS: That I, [NAME]...');