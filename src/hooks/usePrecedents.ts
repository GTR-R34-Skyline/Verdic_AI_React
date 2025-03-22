import { useState, useEffect } from 'react';

interface Precedent {
  id: string;
  title: string;
  court: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  citations: unknown[];
  created_at: string;
  updated_at: string;
}

export function usePrecedents() {
  const [precedents, setPrecedents] = useState<Precedent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrecedents();
  }, []);

  async function fetchPrecedents() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/precedents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch precedents');
      const data = await response.json();
      setPrecedents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching precedents:', error);
      setLoading(false);
    }
  }

  async function searchPrecedents(query: string) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/precedents?query=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to search precedents');
      const data = await response.json();
      setPrecedents(data);
      return data;
    } catch (error) {
      console.error('Error searching precedents:', error);
      throw error;
    }
  }

  return {
    precedents,
    loading,
    searchPrecedents
  };
}