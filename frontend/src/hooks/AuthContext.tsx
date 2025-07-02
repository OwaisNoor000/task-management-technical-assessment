import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token:string |null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  logout: () => {},

});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  // load from local storage 
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
