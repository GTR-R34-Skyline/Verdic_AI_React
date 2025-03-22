import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

// ✅ Define AuthContext type
export interface AuthContextType {
  user: any; // Change to actual user type if known
  signIn: (username: string, password: string) => Promise<any>;
  signUp: (username: string, password: string) => Promise<void>;
}

// ✅ Create Context with default value
const AuthContext = createContext<AuthContextType | null>(null);

// ✅ AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  // ✅ Sign-in Function
  interface LoginResponse {
    user: any; // Replace 'any' with the actual user type if known
    token: string;
  }

  const signIn = async (username: string, password: string): Promise<any> => {
    try {
      const response = await axios.post<LoginResponse>("http://localhost:5000/api/login", {
        username, // ✅ Correct field
        password,
      });

      console.log("Login Success:", response.data);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);

      return response.data.user; // ✅ Return user data for navigation
    } catch (error) {
      console.error("Login Failed:", error);
      throw error;
    }
  };

  // ✅ Sign-up Function
  const signUp = async (username: string, password: string): Promise<void> => {
    try {
      await axios.post("http://localhost:5000/api/register", {
        username, // ✅ Fixed field
        password,
      });
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ useAuth Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
