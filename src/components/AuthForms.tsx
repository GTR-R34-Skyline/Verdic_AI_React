import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth

export default function AuthForms() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();

  if (!auth) {
    return (
      <div>
        <p>Error: Authentication context is missing.</p>
      </div>
    );
  }

  const { signIn, signUp } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const user = await signIn(username, password);
        if (user) {
          console.log("Login successful! Redirecting...");
          navigate("/home");
        }
      } else {
        await signUp(username, password);
        setIsLogin(true); // Switch to login after successful signup
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(isLogin ? "Invalid credentials" : err.message || "Registration failed");
      }else{
        setError(isLogin ? "Invalid credentials" : "Registration failed");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Sign Up" : "Switch to Sign In"}
        </button>
      </form>
    </div>
  );
}