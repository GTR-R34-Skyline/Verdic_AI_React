export interface User {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string | null;
  template: string;
  created_at: Date;
  updated_at: Date;
}

export interface Document {
  id: string;
  user_id: string;
  type_id: string;
  title: string;
  content: string;
  metadata: string;
  created_at: Date;
  updated_at: Date;
}

export interface Case {
  id: string;
  user_id: string;
  case_number: string;
  client_name: string;
  type: string;
  status: string;
  due_date: Date | null;
  description: string | null;
  metadata: string;
  created_at: Date;
  updated_at: Date;
}

export interface Precedent {
  id: string;
  title: string;
  court: string;
  date: Date;
  category: string;
  summary: string;
  content: string;
  citations: string;
  created_at: Date;
  updated_at: Date;
}