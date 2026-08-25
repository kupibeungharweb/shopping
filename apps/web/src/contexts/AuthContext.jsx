import React, { createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const value = {
    user: null,
    isAuthed: false,

    login: async () => {
      console.warn("Login dinonaktifkan pada versi GitHub Pages.");
    },

    signup: async () => {
      console.warn("Signup dinonaktifkan pada versi GitHub Pages.");
    },

    logout: () => {},

    loginWithGoogle: async () => {
      console.warn("Login Google dinonaktifkan.");
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
