import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // ✅ Import Auth Context
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DocumentGenerator from "./pages/DocumentGenerator";
import PrecedenceFinder from "./pages/PrecedenceFinder";
import Chatbot from "./pages/Chatbot";
import Backlog from "./pages/Backlog";
import AuthForms from "./components/AuthForms";

// ✅ Private Route Wrapper (Only Logged-In Users Can Access)
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/login" element={<AuthForms />} />

      {/* ✅ Protected Routes (Require Login) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Home />
            </div>
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Navbar />
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/document-generator"
        element={
          <PrivateRoute>
            <Navbar />
            <DocumentGenerator />
          </PrivateRoute>
        }
      />
      <Route
        path="/precedence-finder"
        element={
          <PrivateRoute>
            <Navbar />
            <PrecedenceFinder />
          </PrivateRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <PrivateRoute>
            <Navbar />
            <Chatbot />
          </PrivateRoute>
        }
      />
      <Route
        path="/backlog"
        element={
          <PrivateRoute>
            <Navbar />
            <Backlog />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
