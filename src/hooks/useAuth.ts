import { useState } from 'react';

interface AuthUser {
  id: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      
      // Decode token to get user info
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.id, email: payload.email });
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      
      // Decode token to get user info
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.id, email: payload.email });
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };
}