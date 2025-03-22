export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      document_types: {
        Row: {
          id: string
          name: string
          description: string | null
          template: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          template: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          template?: string
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          type_id: string
          title: string
          content: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type_id: string
          title: string
          content: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type_id?: string
          title?: string
          content?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      cases: {
        Row: {
          id: string
          user_id: string
          case_number: string
          client_name: string
          type: string
          status: string
          due_date: string | null
          description: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          case_number: string
          client_name: string
          type: string
          status: string
          due_date?: string | null
          description?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          case_number?: string
          client_name?: string
          type?: string
          status?: string
          due_date?: string | null
          description?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      precedents: {
        Row: {
          id: string
          title: string
          court: string
          date: string
          category: string
          summary: string
          content: string
          citations: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          court: string
          date: string
          category: string
          summary: string
          content: string
          citations?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          court?: string
          date?: string
          category?: string
          summary?: string
          content?: string
          citations?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}