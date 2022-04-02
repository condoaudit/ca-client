import React, { useState, createContext } from 'react';

interface AuthContextType {
  user: any;
  signin: (encodedJwt: string) => void;
  signout: () => void;
}

const TOKEN_KEY = 't';

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>();

  const signin = (encodedJwt: string) => {
    localStorage.setItem(TOKEN_KEY, encodedJwt);
    setUser(JSON.parse(encodedJwt));
  }

  const signout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  const value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
