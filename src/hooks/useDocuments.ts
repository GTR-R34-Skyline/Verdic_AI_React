import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Document = Database['public']['Tables']['documents']['Row'];
type DocumentType = Database['public']['Tables']['document_types']['Row'];

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
    fetchDocumentTypes();
  }, []);

  async function fetchDocuments() {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setDocuments(data);
    setLoading(false);
  }

  async function fetchDocumentTypes() {
    const { data, error } = await supabase
      .from('document_types')
      .select('*');

    if (error) throw error;
    setDocumentTypes(data);
  }

  async function createDocument(document: Database['public']['Tables']['documents']['Insert']) {
    const { data, error } = await supabase
      .from('documents')
      .insert(document)
      .select()
      .single();

    if (error) throw error;
    setDocuments([data, ...documents]);
    return data;
  }

  async function updateDocument(id: string, updates: Database['public']['Tables']['documents']['Update']) {
    const { data, error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    setDocuments(documents.map(doc => doc.id === id ? data : doc));
    return data;
  }

  async function deleteDocument(id: string) {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setDocuments(documents.filter(doc => doc.id !== id));
  }

  return {
    documents,
    documentTypes,
    loading,
    createDocument,
    updateDocument,
    deleteDocument
  };
}