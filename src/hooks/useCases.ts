import { useState, useEffect } from 'react';

interface Case {
  id: string;
  user_id: string;
  case_number: string;
  client_name: string;
  type: string;
  status: string;
  due_date: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export function useCases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/cases', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch cases');
      const data = await response.json();
      setCases(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cases:', error);
      setLoading(false);
    }
  }

  async function createCase(caseData: Omit<Case, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/cases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(caseData)
    });

    if (!response.ok) throw new Error('Failed to create case');
    const newCase = await response.json();
    setCases([newCase, ...cases]);
    return newCase;
  }

  async function updateCase(id: string, updates: Partial<Case>) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/cases/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error('Failed to update case');
    const updatedCase = await response.json();
    setCases(cases.map(c => c.id === id ? updatedCase : c));
    return updatedCase;
  }

  async function deleteCase(id: string) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/cases/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to delete case');
    setCases(cases.filter(c => c.id !== id));
  }

  return {
    cases,
    loading,
    createCase,
    updateCase,
    deleteCase
  };
}