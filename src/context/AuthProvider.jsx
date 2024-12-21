// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock function to simulate login
  const login = async (credentials) => {
    // Simulate an API call
    const userData = { id: 1, name: "John Doe", email: "john@example.com" };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Mock function to simulate logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Simulate loading user data from local storage or an API
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
